import { ACHIEVEMENT_CONFIG } from "../../gameconfig/achievements"
import { useAppSelector } from "../../redux/hooks"
import { selectUnlockedAchievements } from "../../redux/statsSlice"

export default function Achievements() {
  function displayAchievements() {
    const unlockedAchievements = useAppSelector(selectUnlockedAchievements)

    Object.entries(ACHIEVEMENT_CONFIG).map(([feature, category]) => {
      Object.values(category).map((achievements) => {
        achievements.forEach((achievement) => {
          console.log(achievement)
        })
      })
    })

    return undefined
  }

  return (
    <div className="flex h-full">
      <div className="flex gap-1 flex-col h-full">
        <div className="flex items-center gap-2">
          {}
          {/* <h2 className="font-bold text-xl mb-2">Achievement Category</h2>
          <div className="flex gap-x-4 flex-wrap">
            <div className=(styling based on completion status)>Achievement 1</div>
            <div>Achievement 2</div>
          </div>
        </div>*/}
        </div>
      </div>
    </div>
  )
}
