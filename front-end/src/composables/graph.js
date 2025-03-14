
export function useGraph(){
    function totalErrors(lessons){
        let total = 0;
        lessons.forEach(lesson => {
            total += totalLessonErrors(lesson);
        });
        return total;
    }

    function totalLessonErrors(lesson){
        let total = 0;
        lesson.errors.forEach(errorObj => {
            const testErrors = errorObj.errors;
            Object.values(testErrors).forEach(functions => {
                Object.values(functions).forEach(count => {
                    total += count;
                });
            });
        });
        return total;
    }

    function totalExerciseErrors(exercise){
        let total = 0;
        const testErrors = exercise.errors;
        Object.values(testErrors).forEach(functions => {
            Object.values(functions).forEach(count => {
                total += count;
            });
        });
        return total;
    }

    return { totalErrors, totalLessonErrors, totalExerciseErrors };
}