import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const CategoryCardGroup = ({ categoryTitle, cards }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold my-6 text-center">{categoryTitle}</h2>
      <div className="flex flex-wrap justify-center gap-10 m-8 p-4">
        {cards.map((card, index) => (
          <div key={index} className="card max-w-xs md:max-w-xs lg:w-1/5 bg-gradient-to-b from-base-200 to-base-400 shadow-xl">
            <figure className="px-10 pt-10">
              <Image src={card.imageUrl} alt="logo" className="rounded" width={60} height={60} />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{card.title}</h2>
              <p>{card.text}</p>
              <div className="card-actions">
                <Link href={card.link}>
                  <button className="btn btn-primary">开始使用</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryCardGroup
