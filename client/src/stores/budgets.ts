import type { User } from "./users"
import session from './session';

export interface Budget {
    date: number;
    weekNo: number;
    spendingLimit: number;
    categories: Category[];
}

interface Category {
    categoryType: string;
    entries: Entry[];
}

interface Entry {
    spent: number
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

export function addEntry(budget: Budget, value: number, passedCategory: string, description: string, date: number, weekly: boolean) {
    let insertedEntry: Boolean = false;
    budget.categories.forEach(category => {
        if(category.categoryType.toLowerCase() == passedCategory.toLowerCase()) {
            category.entries.push({
                spent: value,
                description: description,
                date: date,
                weekly: weekly
            });
            insertedEntry = true;
        }
    });
    
    if(insertedEntry == false) {
        
        budget.categories.push({ 
            categoryType: passedCategory, 
            entries: [{
                spent: value,
                description: description,
                date: date,
                weekly: weekly
            }]
        });
    }  
}

export function addBudget(user: User, date: number, weekNo: number, limit: number) {
    user.budgets.push({
        date: date,
        weekNo: weekNo,
        spendingLimit: limit,
        categories: [] as Category[]
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

