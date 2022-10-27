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

    validateData(){
        for(let i in this){
            if(this[i]== undefined || this[i] == '' || this[i] == null){
                return false
            }
            //this[i] recover the value of variable i
        }
        return true
    }
 }

 class DataBaseClass {

	constructor() {
		let id = localStorage.getItem('id')

		if(id === null) {
			localStorage.setItem('id', 0)
		}
	}

	getID() {
		let nextID = localStorage.getItem('id')
		return parseInt(nextID) + 1
	}

	register(spent) {
		let id = this.getID()

		localStorage.setItem(id, JSON.stringify(spent))

		localStorage.setItem('id', id)
	}

    allRegisters(){
        let expenseArray = Array()

        let ID = localStorage.getItem('id')
        for(let i = 1; i<=ID; i++){
            //transform json in literal object
            let getExpense = JSON.parse(localStorage.getItem(i));
            
            //lets ignore index with value = null, in other words, index that was removed
            if(getExpense === null){
                continue
            }
            //add expense in array
            expenseArray.push(getExpense);

        }
        return expenseArray;
    }

    search(expense){
        //get all registers in DB
        let filtersExpenses = Array()
        filtersExpenses = this.allRegisters()


    
        console.log(expense)
        console.log(filtersExpenses)

        if(expense.year != ''){
            console.log('entrou em filtro ano')
            filtersExpenses =filtersExpenses.filter(searchValue => searchValue.year == expense.year)
        }
        if(expense.month != ''){
            console.log('entrou em filtro mes')
            filtersExpenses =filtersExpenses.filter(searchValue => searchValue.month == expense.month)
        }
        if(expense.day != ''){
            console.log('entrou em filtro dia')
            filtersExpenses =filtersExpenses.filter(searchValue => searchValue.day == expense.day)
        }



        console.log('passou do filtro')
        console.log(filtersExpenses)




                

        // console.log(expense)
        // console.log(filtersExpenses)

        //  //year and others attributes dont be null 
        // if(expense.year != ''){
        //     console.log('entrou ano')
        //     filtersExpenses = filtersExpenses.filter(expenseSearchDB => expenseSearchDB.year == expense.year)
        // }
        // if(expense.month != ''){
        //     console.log('entrou mes')
        //     filtersExpenses = filtersExpenses.filter(expenseSearchDB => expenseSearchDB.month == expense.month)
        // }
        // if(expense.day != ''){
        //     console.log('entrou day')
        //     filtersExpenses = filtersExpenses.filter(expenseSearchDB => expenseSearchDB.day == expense.day)
        // }
        // if(expense.type != ''){
        //     console.log('entrou type')
        //     filtersExpenses = filtersExpenses.filter(expenseSearchDB => expenseSearchDB.type == expense.type)
        // }
        // if(expense.description != ''){
        //     console.log('entrou description')
        //     filtersExpenses = filtersExpenses.filter(expenseSearchDB => expenseSearchDB.description == expense.description)
        // }
        
        // if(expense.valueExpense != ''){
        //     console.log('entrou valor')
        //     filtersExpenses = filtersExpenses.filter(expenseSearchDB => expenseSearchDB.valueExpense == expense.valueExpense)
        // }

    }
}

let DB = new DataBaseClass()

function registerExpense(){
    let year = document.getElementById('year')
    let month = document.getElementById('month')
    let day = document.getElementById('day')

    let type = document.getElementById('type')
    let description = document.getElementById('description')
    let valueExpense = document.getElementById('valueExpense')


    let expense = new Expense(
        year.value,
        month.value,
        day.value,
        type.value,
        description.value,
        valueExpense.value
        )

    if(expense.validateData()){
        //success dialog
        DB.register(expense)
        document.getElementById('modalTitle').innerHTML = "Success";
        document.getElementById('modalTitleDIV').className = "modal-header text-success";
        document.getElementById('modalContent').innerHTML="Expense save";
        document.getElementById('modalButton').className = "btn btn-success";

        $('#modalRegisterExpense').modal('show')

        //if validate success, restart fields
        year.value=''
        month.value=''
        day.value=''
        type.value=''
        description.value=''
        valueExpense.value=''

    }else{
        //error dialog
        document.getElementById('modalTitle').innerHTML = "ERROR";
        document.getElementById('modalTitleDIV').className = "modal-header text-danger";
        document.getElementById('modalContent').innerHTML= "Fill the required fields";
        document.getElementById('modalButton').className = "btn btn-danger";

        $('#modalRegisterExpense').modal('show')

    }   
}


/*
|=====================================
| Code from consultation
|=====================================
*/
//show list of expenses
function ExpensesList(){
    let expenses = Array();

    expenses = DB.allRegisters()

    //select element tbody 
    let expenseList = document.getElementById('expenseListID')
    
    //get dynamically list expense
    expenses.forEach(function(contentExpense){
        
        //console.log(contentExpense);

        //create tr
        let rowTable = expenseList.insertRow();

        //create td
        rowTable.insertCell(0).innerHTML = `${contentExpense.day}/${contentExpense.month}/${contentExpense.year}` 
        //0 = position cell
        
        //transform type value in phrases
        switch(contentExpense.type){
            case '1': contentExpense.type = 'Food'
                break
            case '2': contentExpense.type = 'Education'
                break
            case '3': contentExpense.type = 'Leisure'
                break
            case '4': contentExpense.type = 'Health'
                break
            case '5': contentExpense.type = 'Transport'
        }

        //inserting information in cells
        rowTable.insertCell(1).innerHTML = contentExpense.type

        rowTable.insertCell(2).innerHTML = contentExpense.description
        rowTable.insertCell(3).innerHTML = contentExpense.valueExpense

        
    })
}

//search expenses
function searchExpenses(){
    let yearSearch = document.getElementById('year').value
    let monthSearch = document.getElementById('month').value
    let daySearch = document.getElementById('day').value
    let typeSearch = document.getElementById('type').value
    let descriptionSearch = document.getElementById('description').value
    let valueSearch = document.getElementById('valueExpense').value

    let expenseSearch = new Expense(yearSearch,monthSearch,daySearch,typeSearch,descriptionSearch,valueSearch);

    DB.search(expenseSearch)
}