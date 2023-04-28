import type { User } from "./users"

export interface Budget {
    date: number
    weekNo: number
    limit: number
    spending: Entry[]
}

export interface Entry {
    value: number
    category: string
    description: string
    date: number
    weekly: boolean
}

export function status (budget: Budget): String {
    var income: number = budget.date;// can limit be a number instead of array
    var spending = 100;

    if(income*.15 >= spending) {
        return "Good";
    }else if (income*.50 >= spending) {
        return "Ok";
    }else if (income*.75 >= spending) {
        return "Borderline";
    }else if( income!=null ) {
        return "N/A";
    }
    return " "
}

export function addEntry(budget: Budget, value: number, category: string, description: string, date: number, weekly: boolean) {
    budget.spending.push({
        value: value,
        category: category,
        description: description,
        date: date,
        weekly: weekly
    })
}

export function addBudget(user: User, date: number, weekNo: number, limit: number) {
    user.budgets.push({
        date: date,
        weekNo: weekNo,
        limit: limit,
        spending: new Array<Entry>()
    })
}

// commented use of Category interface (no longer exists)
/* export function totalSum (budget: Budget): number {// returns total sum

    var sum = 0;

    for ( var i=0;i<budget.spending.length;i++) {
        sum += sumCat(budget.spending[i]);
    }

    return sum;
}

export function sumCat (cat: Category): number {// returns sum of a category

    var sum = 0;

    for (var i=0;i<cat.entries.length;i++) {
        sum += cat.entries[i].value;
    }

    return sum;
} */

