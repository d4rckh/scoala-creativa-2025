import { useState } from 'react'
import './App.css'
import { Card, CardContent, CardFooter, CardTitle } from './components/ui/card'
import { todayChallenge } from './lib/utils'
import { Button } from './components/ui/button'

function App() {
  const [offset, setOffset] = useState(0);

  return (
    <>
      <div className="flex flex-col px-2">
        <p className="text-4xl text-shadow-2xs font-black text-center mt-10">Provocarea Alimentară Zilnică</p>

        <Card className="mt-10 text-center">
          <CardContent>
            <CardTitle className="text-3xl mb-4">Provocarea de {offset == 0 && "azi"}{offset == -1 && "ieri"}{offset < -1 && "acum " + (-offset) + " zile"} {offset == 0 ? "este" : "era"}: </CardTitle>
            {todayChallenge(offset)}
          </CardContent>
          <CardFooter className="flex sm:flex-row flex-col gap-2 mx-auto">
            <Button variant={"outline"} onClick={() => setOffset((v) => v - 1)}>
              Vezi provocarea {offset == 0 && "din ziua precedentă"}{offset <= -1 && "de acum " + (-offset + 1) + " zile"}
            </Button>
            {
              offset != 0 && <Button onClick={() => setOffset(0)}>Vezi provocarea de azi</Button>
            }
          </CardFooter>
        </Card>

        <div className="text-center mt-10">
          Site creat de Sonea Andrei pentru concursul Școala Creativă cu tema ALIMENTAȚIA PE BAZE ȘTIINȚIFICE<br/>
          Colegiul Național "Vasile Alecsandri" Iași, profesor coordonator Rusu Beatris
        </div>
      </div>
    </>
  )
}

export default App
