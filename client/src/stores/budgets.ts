export interface Budget {
    date: number
    weekNo: number
    limit: number
    spending: Category[]
}

export interface Category {
    description: string
    entries: Entry[]
}

export interface Entry {
    value: number
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

