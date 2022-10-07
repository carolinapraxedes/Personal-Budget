/*
|=====================================
| Code from register expense
|=====================================
*/ 
 class Expense{
    constructor(year,month, day,type,description,valueExpense){
        this.year = year
        this.month = month
        this.day = day

        this.type = type
        this.description = description
        this.valueExpense = valueExpense
    }
 }

 class DataBase{
    constructor(){
        let id =localStorage.getItem()
        if(id === null){
            localStorage.setItem('id',0)
            //create ID if doesnt exist
        }
    }

    getNextId(){
        let NextId = localStorage.getItem('id') 
        //verify already exist an ID in localstorage
        return parseInt(NextId)+1 
    }

    register(e) {
        //localStorage.setItem('expense', JSON.stringify(e))
        //transform the object expense in JSON and storage in localstorage
        //obs: the indexes are fixed so have data replacement of expenses that already exist

        let id= this.getNextId()
        localStorage.setItem('id',id)
    }
 }

 let DB = new DataBase()

function registerExpense(){
    let year = document.getElementById('year')
    let month = document.getElementById('month')
    let day = document.getElementById('day')

    let type = document.getElementById('type')
    let description = document.getElementById('description')
    let valueExpense = document.getElementById('valueExpense')

    

    let expense = new Expense(year.value,month.value, day.value,type.value,description.value,valueExpense.value)

    DB.register(expense)
    
}





/*
|=====================================
| Code from consultation
|=====================================
*/