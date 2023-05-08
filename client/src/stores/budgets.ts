import type { User } from "./users"
import session from './session';
import { ref } from "vue";

export interface Budget {
    date: number;
    weekNo: number;
    spendingLimit: number;
    categories: Category[];
}

export interface Category {
    categoryType: string;
    entries: Entry[];
}

export interface Entry {
    spent: number
    description: string
    date: number
    weekly: boolean
}

//function to compute percentage of spending return json object
export function computePercentage(spendingLimit: number, category: Category): string {
    const percentage = (sumCat(category) / spendingLimit) * 100;

    const myJSON = '{"categoryType":"'+category.categoryType+'", "percentageOfSpending":'+percentage+'}';
    

    return myJSON;

}
//json object returns each category and sum
export function categoryAndSum(categories: Category[]): string {
    let json = '{';
    for (let i = 0; i < categories.length; i++) {
        json += '"categoryType":"'+categories[i].categoryType+'", "sumOfEntries":'+sumCat(categories[i]);
    }
    return json+'}';
}
/**
 * [
 *  {category: string, sum: number}
 * ]
 */


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
    let categoryList: Category[] = []

    if (user.budgets[0] && user.budgets[0].categories.length > 0) {
        user.budgets[0].categories.forEach(category => {
            category.entries.forEach(entry => {
                if (entry.weekly) {
                    let i = categoryList.findIndex((c) => {
                        return c.categoryType == category.categoryType
                    })

                    if (i == -1) {
                        i = categoryList.push({
                            categoryType: category.categoryType,
                            entries: []
                        }) - 1
                    }

                    categoryList[i].entries.push({
                        weekly: entry.weekly,
                        spent: entry.spent,
                        description: entry.description,
                        date: entry.date
                    })
                }
            })
        })
    } else {
        categoryList = defaultCategories.value.map(c => ({ categoryType: c, entries: [] as Entry[]}))
    }

    user.budgets.push({
        date: date,
        weekNo: weekNo,
        spendingLimit: limit,
        categories:  categoryList
    });
        
}

export function addDefaultCategory(category: string) {
    defaultCategories.value.push(category);
}

export function deleteDefaultCategory(category: string) {
    const index = defaultCategories.value.findIndex(x => x == category);
    defaultCategories.value.splice(index, 1);
}

const defaultCategories = ref<string[]>([
    'Dining',
    'Entertainment',
    'Travel',
    'Health',
    'Finance',
    'Groceries',
    'Transportaion'
])

// commented use of Category interface (no longer exists)
export function totalSum (budget: Budget): number {// returns total sum

    var sum = 0;

    for ( var i=0;i<budget.categories.length;i++) {
        sum += sumCat(budget.categories[i]);
    }

    return sum;
}

export function sumCat (cat: Category): number {// returns sum of a category

    var sum = 0;

    for (var i=0;i<cat.entries.length;i++) {
        sum += cat.entries[i].spent;
    }

    return sum;
} 

