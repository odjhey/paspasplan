export const newTimelineId = (v = Date.now()) => {
  return `tl_${String(v)}`
}

export const newActivityId = (v = Date.now()) => {
  return `act_${String(v)}`
}
