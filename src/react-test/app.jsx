import { people } from './data.jsx';
import { recipes } from './data.jsx';
import { getImageUrl } from './util.jsx';

let chemists = [];
let others = [];
people.forEach(person => {
  if (person.profession === 'chemist') {
    chemists.push(person);
  } else {
    others.push(person);
  }
});

function ListItem({ title, person }) {
  return (
    <section>
      <h2>{title}</h2>
      <ul>
        {person.map(person => (
          <li key={person.id}>
            <img src={getImageUrl(person)} alt={person.name} />
            <p><b>{person.name}:</b> {' ' + person.profession + ' '} known for {person.accomplishment}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function RecipeList({ recipes }) {
  return (
      <ul>
        {recipes.map(recipe => (
          <div key={recipe.id}>
            <h2>{recipe.name}</h2>
            <ul>
              {recipe.ingredients.map(ingredient => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>
          </div>
        ))}
      </ul>
  );
}


export default function List() {
  return (
    <article>
      <section>
        <h1>Scientists</h1>
        <ListItem title="Chemists" person={chemists} />
        <ListItem title="Others" person={others} />
      </section>
      <section>
        <h1>Recipes</h1>
        <RecipeList recipes={recipes} />
      </section>
    </article>
  );
}
