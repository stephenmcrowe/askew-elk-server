import csv
import json
import io
import datetime

# max number of recipes to load
RECIPE_LIMIT = 100

# open json file
f = open("full_format_recipes.json", 'r')
json_string = f.read()
f.close()

# get parsed json string
parsed = json.loads(json_string)

# create all the csv files for each table
recipes_fp = io.open('recipes.csv', 'w', newline='', encoding='utf-8')
nutrition_fp = io.open('nutrition.csv', 'w', newline='', encoding='utf-8')
ingredient_fp = io.open('ingredients.csv', 'w', newline='', encoding='utf-8')
recipes_to_ingredient_fp = io.open('recipe_to_ingredient.csv', 'w', newline='', encoding='utf-8')
directions_fp = io.open('directions.csv', 'w', newline='', encoding='utf-8')
categories_fp = io.open('categories.csv', 'w', newline='', encoding='utf-8')
recipe_to_category_fp = io.open('recipe_to_category.csv', 'w', newline='', encoding='utf-8')
rates_fp = io.open('rates.csv', 'w', newline='', encoding='utf-8')

# set up writers and write headers
# delimeter = "|" quote_char = "$"
recipe_writer = csv.writer(recipes_fp, delimiter='|', quotechar='$', quoting=csv.QUOTE_NONNUMERIC)
recipe_writer.writerow(["RecipeID", "RecipeName", "RecipeAuthor", "Rating", "Description", "DateAdded"])

nutrition_writer = csv.writer(nutrition_fp, delimiter='|', quotechar='$', quoting=csv.QUOTE_NONNUMERIC)
nutrition_writer.writerow(["RecipeID", "Fat", "Sodium", "Calories", "Protein"])

ingredient_writer = csv.writer(ingredient_fp, delimiter='|', quotechar='$', quoting=csv.QUOTE_NONNUMERIC)
ingredient_writer.writerow(["IngredientID", "IngredientName"])

recipe_to_ingredient_writer = csv.writer(recipes_to_ingredient_fp, delimiter='|', quotechar='$', quoting=csv.QUOTE_NONNUMERIC)
recipe_to_ingredient_writer.writerow(["RecipeID", "IngredientID"])

directions_writer = csv.writer(directions_fp, delimiter='|', quotechar='$', quoting=csv.QUOTE_NONNUMERIC)
directions_writer.writerow(["RecipeID", "StepNumber", "Direction"])

category_writer = csv.writer(categories_fp, delimiter='|', quotechar='$', quoting=csv.QUOTE_NONNUMERIC)
category_writer.writerow(["CategoryID", "CategoryName"])

recipe_to_category_writer = csv.writer(recipe_to_category_fp, delimiter='|', quotechar='$', quoting=csv.QUOTE_NONNUMERIC)
recipe_to_category_writer.writerow(["RecipeID", "CategoryID"])

rates_writer = csv.writer(rates_fp, delimiter='|', quotechar='$', quoting=csv.QUOTE_NONNUMERIC)
rates_writer.writerow(["RecipeID", "UserID", "Rating"])

# vars for loop
recipe_id = 1
ingredient_id = 1
ingredient_dict = {}
category_id = 1
category_dict = {}

for recipe in parsed:

    # check limit
    if recipe_id > RECIPE_LIMIT:
        break

    # get all attributes
    name = recipe.get('title')
    if name is not None:

        rating = recipe.get('rating')
        if rating is None:
            rating = 'null'

        desc = recipe.get('desc')
        if desc is None:
            desc = 'null'

        date_added = recipe.get('date')
        if date_added is None:
            date_added = 'null'
        else:
            date_added = datetime.datetime.strptime(date_added, '%Y-%m-%dT%H:%M:%S.%f%z')
            date_added = date_added.strftime('%Y-%m-%d %H:%M:%S')

        # write recipe row
        recipe_writer.writerow([str(recipe_id), name.rstrip(), 'null', rating, desc, date_added])

        fat = recipe.get('fat')
        if fat is None:
            fat = 'null'

        sodium = recipe.get('sodium')
        if sodium is None:
            sodium = 'null'

        calories = recipe.get('calories')
        if calories is None:
            calories = 'null'

        protein = recipe.get('protein')
        if protein is None:
            protein = 'null'

        # write nutrition row
        nutrition_writer.writerow([str(recipe_id), fat, sodium, calories, protein])

        # ingredients
        for ingredient in recipe.get('ingredients'):
            ingredient = ingredient.lower()
            if ingredient in ingredient_dict:
                recipe_to_ingredient_writer.writerow([recipe_id, ingredient_dict.get(ingredient)])
            else:
                ingredient_dict[ingredient] = ingredient_id
                ingredient_writer.writerow([ingredient_id, ingredient])
                recipe_to_ingredient_writer.writerow([recipe_id, ingredient_id])
                ingredient_id += 1

        # directions
        step_number = 1
        for direction in recipe.get('directions'):
            directions_writer.writerow([recipe_id, step_number, direction])
            step_number += 1

        # categories
        for category in recipe.get('categories'):
            if category in category_dict:
                recipe_to_category_writer.writerow([recipe_id, category_dict.get(category)])
            else:
                category_dict[category] = category_id
                category_writer.writerow([category_id, category])
                recipe_to_category_writer.writerow([recipe_id, category_id])
                category_id += 1

        # rates
        rates_writer.writerow([recipe_id, 131, rating])

        recipe_id += 1

# close all the files
recipes_fp.close()
nutrition_fp.close()
ingredient_fp.close()
recipes_to_ingredient_fp.close()
directions_fp.close()
categories_fp.close()
recipe_to_category_fp.close()
rates_fp.close()
