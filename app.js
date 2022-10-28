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
        //percorre todos os valores para verificar os valores

        let dayFail;
        let fielFail;

        for(let i in this){
            //recupera todos os atributos do objecto expense
            //o operdor i recupera os atributos this[i] = this.atributos
            
            if(this[i]== undefined || this[i] == '' || this[i] == null){
                console.log("entrou no null") 
                if(i = this.day){
                    console.log(this.day)
                    if(i <1 || i>30){
                        alert('data invalida')
                        
                    }
                }              
                return false
                
            }

            //this[i] recover the value of variable i
        }
    
        console.log("nao é false") 
        return true
    };



    // validateDay(){
   
    //     if(this.validateData == true){
    //         console.log('o numero nao é null')
    //         if (this.day.value<1 || this.day.value>31){
    //             console.log('data invalida')
    //             return false
    //         }
    //     }

        
    //     return true
    // }

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

    if(expense.validateData() ){
        //success dialog
        /*DB.register(expense)*/
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
        console.log('entrou no else')
        document.getElementById('modalTitle').innerHTML = "ERROR";
        document.getElementById('modalTitleDIV').className = "modal-header text-danger";
        document.getElementById('modalButton').className = "btn btn-danger";
        let temp = document.getElementById('modalContent').innerHTML= "ALGO";
        console.log('antes do if')
        console.log(expense.validateData.dayFail)
        if(expense.validateData.dayFail){
            
            temp = document.getElementById('modalContent').innerHTML= "DATA INVALIDA";
           

        }else if(expense.validateData.fielFail){
            console.log('field')
            temp = document.getElementById('modalContent').innerHTML= "INVALIDO ALGUM OUTRO CAMPO";
        }
        temp
        console.log('depois do if')
        $('#modalRegisterExpense').modal('show')
        //error dialog
       /* document.getElementById('modalTitle').innerHTML = "ERROR";
        document.getElementById('modalTitleDIV').className = "modal-header text-danger";
        document.getElementById('modalContent').innerHTML= "Fill the required fields";
        document.getElementById('modalButton').className = "btn btn-danger";

        $('#modalRegisterExpense').modal('show')*/

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


    let expenseSearch = new Expense(yearSearch,monthSearch,daySearch);

    DB.search(expenseSearch)
}