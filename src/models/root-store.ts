import { types } from 'mobx-state-tree'

const Activity = types.model({
  id: types.identifier,
  name: types.string,
})

const TimelineItem = types
  .model({
    id: types.identifier,
    date: types.Date,
    // TODO: add activity sorting
    activities: types.array(types.reference(Activity)),
  })
  .actions((self) => {
    return {
      addActivity: (id: string) => {
        self.activities.push(id)
      },
    }
  })

const Timeline = types
  .model({
    id: types.identifier,
    name: types.string,
    items: types.array(TimelineItem),
  })
  .views((self) => {
    return {
      vActivities: () => {
        return self.items
          .flatMap((a) => a.activities)
          .map((a) => JSON.stringify(a))
      },
    }
  })
  .actions((self) => {
    return {
      addEntry: (name: string) => {
        // TODO: extract date to be part of the params
        self.items.push({ id: name, date: new Date() })
      },
      addActivity: (timelineId: string, activityId: string) => {
        const timelineMatch = self.items.find((i) => i.id === timelineId)
        if (timelineMatch) {
          timelineMatch.addActivity(activityId)
        }
      },
    }
  })

export const RootStore = types
  .model({
    activities: types.array(Activity),
    timelines: types.array(Timeline),
  })
  .actions((self) => {
    return {
      addActivity: (activity: { id: string; name: string }) => {
        self.activities.push(activity)
      },
      addTimeline: (timeline: { id: string; name: string }) => {
        self.timelines.push(timeline)
      },
    }
  })
