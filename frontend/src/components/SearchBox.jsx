function SearchBox({ search, setSearch }) {

  return (

    <div className="mt-8">

      <input

        value={search}

        onChange={(e) => setSearch(e.target.value)}

        className="border p-3 rounded-lg w-full max-w-xl"

        placeholder="Search Institution"

      />


      <button className="bg-blue-600 text-white px-6 py-3 rounded-lg ml-3">
        Search
      </button>


    </div>

  )

}


export default SearchBox;
