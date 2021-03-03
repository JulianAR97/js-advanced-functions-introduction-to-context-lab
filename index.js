// Your code here

let createEmployeeRecord = function(person) {
  return {
    firstName: person[0],
    familyName: person[1],
    title: person[2],
    payPerHour: person[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

let createEmployeeRecords = people => people.map(createEmployeeRecord)

let createTimeInEvent = function(person, dateStamp) {
  let timeObj = {
    type: 'TimeIn',
    hour: parseInt(dateStamp.slice(-4)),
    // There is a space between date and time in string. We only need date here
    date: dateStamp.split(' ')[0]
  }
  person.timeInEvents.push(timeObj);
  return person
}

let createTimeOutEvent = function(person, dateStamp) {
  let timeObj = {
    type: 'TimeOut',
    hour: parseInt(dateStamp.slice(-4)),
    date: dateStamp.split(' ')[0]
  }
  person.timeOutEvents.push(timeObj);
  return person
}

let hoursWorkedOnDate = function(person, date) {
  let timeInEvent = person.timeInEvents.find(e => e.date === date);
  let timeOutEvent = person.timeOutEvents.find(e => e.date === date);
  return (timeOutEvent.hour - timeInEvent.hour) / 100
}

let wagesEarnedOnDate = function(person, date) {
  return hoursWorkedOnDate(person, date) * person.payPerHour;
}

let allWagesFor = function(person) {
  return person.timeOutEvents.reduce((e1, e2) => wagesEarnedOnDate(person, e1.date) + wagesEarnedOnDate(person, e2.date));
}

let calculatePayroll = function(people) {
  return people.reduce((a, b) => allWagesFor(a) + allWagesFor(b));
}

let findEmployeeByFirstName = function(people, name) {
  return people.find(p => p.firstName === name);
}
// cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 27])
// // Earns 324
// updatedBpRecord = createTimeInEvent(cRecord, "0044-03-14 0900")
// updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-14 2100")
// // Earns 54
// updatedBpRecord = createTimeInEvent(cRecord, "0044-03-15 0900")
// updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-15 1100")


// console.log(cRecord)
// console.log('')
// console.log(wagesEarnedOnDate(cRecord, '0044-03-15'))
// console.log(hoursWorkedOnDate(cRecord, '0044-03-15'))
