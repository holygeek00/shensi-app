import React from 'react'
import Link from 'next/link'

const CategoryCardGroup = ({ categoryTitle, cards }) => {
  return (
    <div >
      <h2 className="text-3xl font-bold my-6 text-center">{categoryTitle}</h2>
      <div className="flex flex-wrap lg:justify-start xl:justify-start sm:justify-center lg:gap-20 p-4 lg:ml-32 xl:ml-44 md:gap-10 md:justify-start md:ml-24 sm:gap-10">
        {cards.map((card, index) => (
          <div key={index} className="max-w-xs md:max-w-xs lg:w-1/4 shadow-xl border-white rounded-xl hover:scale-105 transition cursor-pointer" style={{"border": "2px solid white", "background": "linear-gradient(143deg, #f8f9ff, #fbfbff, 0.5)"}}>
            <figure className="px-10 pt-10">
              <img src={card.imageUrl} alt="logo" width={60} height={60} />
            </figure>
            <div className="card-body items-start text-start leading-normal">
              <h2 className="card-title">{card.title}</h2>
              <p>{card.text}</p>
              <div className="card-actions">
                <a href={card.link}>
                  <button className="btn btn-primary">开始使用</button>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryCardGroup
