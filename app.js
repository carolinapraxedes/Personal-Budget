
const getDate = new Date();
const NowYear = getDate.getFullYear();


function Years(){
    let selectYear = document.getElementById('year');
    //create new options for each year


    let firstYear= parseInt(selectYear.children[1].value) +1
    for(i=firstYear;i<=NowYear;i++){
        
        createOption = document.createElement("option");
        createOption.textContent=i;
        //put text in the option
        createOption.value=i;
        //put value in the option
        selectYear.options.add(createOption)
    }
}

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
 

        for(let [i,k] of Object.entries(this) ){
            //faz um loop dentro do object que o this está chamando, verificando o valor de cada chave

            /*max day each month*/ 
            let MaxDay= [31,
                28,
                31,
                30,
                31,
                30,
                31,
                31,
                30,
                31,
                30,
                31
            ];

            if(this[i]== undefined || this[i] == '' || this[i] == null)
                //verify if field is empty
               return {erro:true,message:"Fill the required fields"};
            if(this.day>MaxDay[this.month-1])
                //verify if day field is valid
                return {erro:true,message:"Invalid Day"};

            
        }

        return {erro:false,message:'Save Expense'}
    };


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

            //get id expense
            getExpense.id =i;
            //add expense in array
            expenseArray.push(getExpense);

        }
        return expenseArray;
    }

    search(expense){
        //get all registers in DB
        let filtersExpenses = Array()
        filtersExpenses = this.allRegisters()


    


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
        
        return filtersExpenses;        
    }

    delete(id){
        localStorage.removeItem(id)
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
  

    let validate = expense.validateData()
    if(!validate.erro ){
        //success dialog
        DB.register(expense)
        document.getElementById('modalTitle').innerHTML = "Success";
        document.getElementById('modalTitleDIV').className = "modal-header text-success";
        document.getElementById('modalContent').innerHTML= validate.message;
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
      
        document.getElementById('modalTitle').innerHTML = "ERROR";
        document.getElementById('modalTitleDIV').className = "modal-header text-danger";
        document.getElementById('modalButton').className = "btn btn-danger";
        document.getElementById('modalContent').innerHTML= validate.message;

        $('#modalRegisterExpense').modal('show')

    }   


}


/*
|=====================================
| Code from consultation
|=====================================
*/
//show list of expenses
function ExpensesList(expenses = Array(),filter= false){
    if(expenses.length==0 && filter == false){
        //return all expenses,search = null
        expenses = DB.allRegisters()
    }


   

    //select element tbody 
    let expenseList = document.getElementById('expenseListID')
    expenseList.innerHTML=''
    
    //get dynamically list expense
    expenses.forEach(function(contentExpense){
        
        //console.log(contentExpense);

        //create tr
        let rowTable = expenseList.insertRow();

        //create td
        
        if((contentExpense.day>=1 )&&(contentExpense.day<10)){
            // put 0 before number if day<10
            rowTable.insertCell(0).innerHTML =  `0${contentExpense.day}/${contentExpense.month}/${contentExpense.year}` 
        }else{
            rowTable.insertCell(0).innerHTML =  `${contentExpense.day}/${contentExpense.month}/${contentExpense.year}` 
        }
        
        
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

        //button delete
        let btn = document.createElement("button")
        btn.className= 'btn btn-danger'
        btn.innerHTML= '<i class="fas fa-times"></i>'
        btn.id = `idExpense${contentExpense.id}`
        //delete expense
        btn.onclick = function(){
            let id = this.id.replace('idExpense','')            
            DB.delete(id)
            window.location.reload()
        }
        rowTable.insertCell(4).append(btn)
        console.log(contentExpense)

        
    })
}

/*
|=====================================
| Code from search 
|=====================================
*/

//search expenses
function searchExpenses(){
    let yearSearch = document.getElementById('year').value
    let monthSearch = document.getElementById('month').value
    let daySearch = document.getElementById('day').value


    let expenseSearch = new Expense(yearSearch,monthSearch,daySearch);

    let expensesSearch = DB.search(expenseSearch);

    this.ExpensesList(expensesSearch, true)


}