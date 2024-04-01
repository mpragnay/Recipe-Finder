from flask import Flask, request, jsonify, render_template
import pandas as pd

# app instance will be created when the module is imported, regardless of whether it is executed directly or imported as a module by another script
app = Flask(__name__, static_url_path='/static', static_folder='static')

df = pd.read_csv('recipes_data.csv')

recipes=df['NER'].tolist()
display_max_recipes=15

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/search', methods=['GET'])
def search_recipes():
    target_words = request.args.getlist('ingredients[]')
    # app.logger.info(target_words)
    if not target_words:
        return jsonify({'message': 'No ingredients provided.'}), 400
    target_words.sort()

    recipe_inds = []
    for i, lst in enumerate(recipes):
        if all(target_word in lst for target_word in target_words):
            recipe_inds.append(i)

    if len(recipe_inds):
        if len(recipe_inds)>display_max_recipes:
            recipe_inds=recipe_inds[:display_max_recipes]
        titles=[df['title'][i] for i in recipe_inds]
        ingredient_req=[df['ingredients'][i] for i in recipe_inds]
        directions=[df['directions'][i] for i in recipe_inds]
        return jsonify({'titles': titles, 'ingredients' : ingredient_req, 'directions' : directions})
    else:
        return jsonify({'message': 'No recipes found.'}), 404

# if __name__ == '__main__':
#     app.run(debug=False,host='0.0.0.0')
    # app.run(debug=True)
