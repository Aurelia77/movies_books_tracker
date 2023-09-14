import Book from "./Book"
export default function BookTable() {
  return (
    <div>
      <div>Liste de livres</div>

      <Book title='Flash' author='auteur' genre='genre' year={2000} />
      <Book title='Wild' author='auteur' genre='genre' year={2022} />
      <Book title='titre' author='Vargas' genre='genre' year={2023} />


      {/* <table>
        <thead>
          <tr>
            <th>Titre</th>
            <th>Auteur</th>
            <th>Genre</th>
            <th>Année de lecture</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>titre</td>
            <td>auteur</td>
            <td>genre</td>
            <td>année</td>
          </tr>
        </tbody>  
      </table> */}

    </div>

  )
}
