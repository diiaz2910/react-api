import { useEffect, useState } from "react"

const CAT_ENDPOINT_RANDOM_FACT = "https://catfact.ninja/fact"
const CAT_PREFIX_IMAGE_URL = "https://cataas.com"

export function App() {
  const [fact, setFact] = useState()
  const [imageId, setImageId] = useState()

  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then((res) => res.json())
      .then((data) => {
        const { fact } = data
        setFact(fact)

        const threeFirstWords = fact.split(" ", 3).join(" ")
        console.log(threeFirstWords)

        fetch(`https://cataas.com/cat/says/${threeFirstWords}?size=50&color=red&json=true`)
          .then(res => res.json())
          .then(response => {
            console.log("Image response:", response)

            const { _id } = response

            if (_id) {
              console.log("Image _id:", _id)
              setImageId(_id)
            }
          })
      })
  }, [])

  return (
    <main>
      <h1>Cats App</h1>
      {fact && <p>{fact}</p>}
      {imageId && (
        <img
          src={`${CAT_PREFIX_IMAGE_URL}/cat/${imageId}`}
          alt={`Image and 3 first words from ${fact}`}
        />
      )}
    </main>
  )
}