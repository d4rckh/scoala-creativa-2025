import { useState } from 'react'
import './App.css'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './components/ui/card'
import { getUserRankInfo, todayChallenge } from './lib/utils'
import { Button } from './components/ui/button'
import { useAtom } from 'jotai'
import { currentXpAtom, lastDayDidAtom } from './lib/atoms'
import { Progress } from './components/ui/progress'
import { ArrowLeft, ArrowRight, Calendar } from 'lucide-react'

function App() {
  const [offset, setOffset] = useState(0);

  const [xp, setXp] = useAtom(currentXpAtom);
  const [lastDayDid, setLastDayDid] = useAtom(lastDayDidAtom);


  let today = new Date().toDateString();

  const aziFacut = lastDayDid == today;

  function markAsDone() {
    if (offset != 0 || aziFacut) return;

    setLastDayDid(today);
    setXp(xp => xp + 100);
  }

  const rankInfo = getUserRankInfo(xp);

  return (
    <>
      <div className="flex flex-col px-2">
        <p className="text-4xl text-shadow-2xs font-black text-center mt-10">Provocarea Alimentară Zilnică</p>

        <Card className="mt-10 text-center">
          <CardHeader>
            <CardTitle className="text-3xl">Provocarea de {offset == 0 && "azi"}{offset == -1 && "ieri"}{offset < -1 && "acum " + (-offset) + " zile"} {offset == 0 ? "este" : "era"}: </CardTitle>
          </CardHeader>
          <CardContent className="min-h-[140px] mb-3 flex flex-col justify-center">
            <p className="mb-5 font-black text-xl">{todayChallenge(offset)}</p>
            {
              offset == 0 && <>
                {
                  aziFacut ? "Felicitări, revin-o mâine pentru următoarea provocare!" : <Button onClick={markAsDone}>Bifează ca făcut!</Button>
                }
              </>
            }
          </CardContent>
          <CardFooter className="relative">
            <div className="absolute left-2">
              <Button
                variant="ghost"
                onClick={() => setOffset((v) => v - 1)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {offset === 0 ? "Ziua precedentă" : `Acum ${-offset + 1} zile`}
                </span>
              </Button>
            </div>

            {offset !== 0 && (
              <div className="absolute left-1/2 -translate-x-1/2">
                <Button
                  variant="outline"
                  onClick={() => setOffset(0)}
                  className="flex items-center gap-2"
                >
                  <Calendar /> Provocarea de azi
                </Button>
              </div>
            )}

            {offset !== 0 && (
              <div className="absolute right-2">
                <Button
                  variant="ghost"
                  onClick={() => setOffset((v) => v + 1)}
                  className="flex items-center gap-2"
                >
                  <span className="hidden sm:inline">
                    {offset === -1 ? "Azi" : `Acum ${-offset - 1} zile`}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </CardFooter>

        </Card>

        <Card className="mt-10 text-center">
          <CardHeader>
            <CardTitle className="text-2xl">Rangul meu: {rankInfo.rank}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Ai acumulat {xp} puncte. {
              rankInfo.nextLevelXP ? <>Pentru a trece la rangul {rankInfo.nextLevelName} mai ai nevoie de {rankInfo.nextLevelXP} puncte.</> : <>Felicitări ai rangul cel mai înalt!</>
            }</p>
            <Progress className="mt-6 h-5" value={rankInfo.progressPercent} />
          </CardContent>
        </Card>

        <div className="text-center mt-10">
          Site realizat de Sonea Andrei pentru concursul interdisciplinar „Școala Creativă”, desfășurat în cadrul proiectului educațional „Alimentația pe baze științifice”, organizat de Colegiul Național „Ion Neculce” din București.<br />
          Coordonator: Prof. Rusu Beatris, Colegiul Național „Vasile Alecsandri” Iași.
        </div>
      </div>
    </>
  )
}

export default App
