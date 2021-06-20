const useGetDate = (dateStr) => {
  const newDate = new Date(dateStr)
  const hours = newDate.getHours()
  const amPm = hours > 12 ? 'PM' : 'AM'
  return `${newDate.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")} ${amPm}`
}

export default useGetDate