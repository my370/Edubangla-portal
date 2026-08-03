function StatsCard({ number, title }) {

  return (

    <div className="shadow p-6 rounded-lg text-center">


      <h3 className="text-3xl font-bold text-blue-600">
        {number}
      </h3>


      <p>
        {title}
      </p>


    </div>

  )

}


export default StatsCard;
