import React from 'react'

function Pagination({dataPerPage, totalData, paginate}) {
    const pageNumber =[]

    for(let i = 1; i <= Math.ceil(totalData/dataPerPage); i++){
        pageNumber.push(i);
    }

  return (
    <nav>
        <ul className="pagination">
        {/* <li class="page-item"><a class="page-link" href="#">Previous</a></li> */}
            {pageNumber.map(number => (
                <li key={number} className="page-item">
                    <a onClick={() => paginate(number)} className='page-link active'>
                        {number}
                    </a>
                </li>
            ))}
        {/* <li class="page-item"><a class="page-link" href="#">Next</a></li> */}
        </ul>
    </nav>
  )
}

export default Pagination