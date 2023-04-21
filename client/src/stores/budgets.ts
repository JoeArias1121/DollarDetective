import { compareTime, getWeekNum, type Time, comp24Hours, time24hoursAgo} from "./time";

export interface Budget {
    start: Time
    initialized: Time
    lastChanged: Time
    income: Category[]
    spending: Category[]
}

export interface Category {
    name: string
    entries: Entry[]
}

export interface Entry {
    value: number
    description: string
    time: Time
    weekly: boolean
}

export function getLatestBudget(budgets: Budget[]): Budget {
    var latest: Budget = budgets[0];
    
    for (var i = 1; i < budgets.length; i++) {
        if (compareTime(budgets[i].start, latest.start) < 0) {
            latest = budgets[i];
        }
    }

    return latest
}

export function last24Hours(budget: Budget, now: Time): Budget {
    var last24: Budget;
    var catArray: Category[] = budget.spending;
    var entryArray: Entry[];
    var tempCatArray: Category[];
    var tempEntryArray: Entry[];
    for (var i = 0; i < catArray.length; i++){
        entryArray = catArray[i].entries;

        for (var j = 0; j < entryArray.length; j++){

            if(comp24Hours(now,entryArray[j].time) == 0){

                tempEntryArray[tempEntryArray.length] = entryArray[j];

            }

        }
        tempCatArray[tempCatArray.length].entries = tempEntryArray;
        tempCatArray[tempCatArray.length].name = catArray[i].name;
    }

    last24.spending = tempCatArray;
    last24.start = time24hoursAgo(now);
    last24.initialized = now;
    last24.lastChanged = now;
    return last24;
}