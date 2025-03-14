<script setup>
import { useGraph } from '@/composables/graph';
import { useTeacher } from '@/composables/teacher';
import { onMounted, ref, computed } from 'vue';
import ErrorChart from '@/components/structure/chart/ErrorChart.vue';
import Selector from '@/components/metier/statistiques/Selector.vue';
import BreadCrumbs from '@/components/metier/statistiques/BreadCrumbs.vue';
import ModuleInfoPanel from '@/components/metier/statistiques/ModuleInfoPanel.vue';
import LessonInfoPanel from '@/components/metier/statistiques/LessonInfoPanel.vue';
import ExerciseInfoPanel from '@/components/metier/statistiques/ExerciseInfoPanel.vue';

const { getModuleUser, getErrorsByModule } = useTeacher();
const graph = useGraph();
const modules = ref([]);
const lessons = ref([]);

const selected = ref({
    module: null,
    lesson: null,
    exercise: null,
});

// Handlers
const handleModuleChange = async () => {
    selected.value = { module: selected.value.module, lesson: null, exercise: null };
    if (selected.value.module) {
        lessons.value = await getErrorsByModule(selected.value.module);
    }
};

const handleLessonSelect = (lessonIndex) => {
    selected.value.lesson = lessons.value[lessonIndex];
    selected.value.exercise = null;
};

const handleExerciseSelect = (exercise) => {
    selected.value.exercise = exercise;
};

const handleBreadcrumbClick = (level) => {
    if (level === 'module') {
        selected.value.lesson = null;
        selected.value.exercise = null;
    } else if (level === 'lesson') {
        selected.value.exercise = null;
    }
};

const handleChartClick = (index) => {
    if (!selected.value.lesson) {
        handleLessonSelect(index);
    } else if (!selected.value.exercise) {
        handleExerciseSelect(selected.value.lesson.errors[index]);
    }
};

// Manage chart data
const chartData = computed(() => {
    let data = {
        labels: [],
        datasets: []
    };

    if (selected.value.exercise) {
        const errorData = Object.entries(selected.value.exercise.errors).flatMap(([testName, functions]) =>
            Object.entries(functions).map(([funcName, count]) => ({
                label: `${testName}-${funcName}`,
                count
            }))
        );
        data.labels = errorData.map(d => d.label);
        data.datasets = [{
            data: errorData.map(d => d.count),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
        }];
    } else if (selected.value.lesson) {
        data.labels = selected.value.lesson.errors.map((_, idx) => `Exercice ${idx + 1}`);
        data.datasets = [{
            data: selected.value.lesson.errors.map(ex => graph.totalExerciseErrors(ex)),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
        }];
    } else if (selected.value.module) {
        data.labels = lessons.value.map(lesson => lesson.lessonInfo.name);
        data.datasets = [{
            data: lessons.value.map(lesson => graph.totalLessonErrors(lesson)),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
        }];
    }

    return data;
});

const chartOptions = computed(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        title: {
            display: true,
            text: selected.value.exercise ? 'Erreurs par test et fonction' :
                  selected.value.lesson ? 'Erreurs par exercice' :
                  'Erreurs par leçon',
            color: '#9299A4',
        },
        legend: {
            display: false,
            events: []
        },
        tooltip: {
            callbacks: {
                label: (context) => {
                    const label = context.chart.data.labels[context.dataIndex];
                    const value = context.parsed;
                    return `${label}: ${value} erreurs`;
                }
            },
            events: ['mousemove']
        }
    }
}));

// other info
const selectedModuleInfo = computed(() => {
    if (!selected.value.module) return null;
    return modules.value.find(m => m.id === selected.value.module);
});

const selectedExerciseContent = computed(() => {
    if (!selected.value.lesson || !selected.value.exercise) return null;
    const exerciseIndex = selected.value.lesson.errors.indexOf(selected.value.exercise);
    return selected.value.lesson.lessonInfo.content.filter(c => c.type === 'code')[exerciseIndex];
});

// Lifecycle
onMounted(async () => {
    modules.value = await getModuleUser();
    if (modules.value.length > 0) {
        selected.value.module = modules.value[0].id;
        lessons.value = await getErrorsByModule(selected.value.module);
    }
});
</script>

<template>
    <main class="p-6 flex-grow dark:bg-gray-900" v-if="modules.length > 0">
        <h1 class="text-2xl font-bold mb-6 dark:text-white">Statistiques des erreurs</h1>
        
        <Selector
            v-model="selected.module"
            :modules="modules"
            @change="handleModuleChange"
        />

        <!-- Main Content Card -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <BreadCrumbs
                :modules="modules"
                :selected="selected"
                @breadcrumb-click="handleBreadcrumbClick"
            />

            <!-- Content Grid -->
            <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
                <!-- Chart Container -->
                <div class="col-span-1 md:col-span-8 order-1 md:border-r md:pr-6 
                            dark:border-gray-700 text-gray-500 dark:text-gray-300" >
                    <div class="h-[500px]">
                        <ErrorChart
                            :chart-data="chartData"
                            :chart-options="chartOptions"
                            @chart-click="handleChartClick"
                        />
                    </div>
                    <div class="text-center mt-4 text-sm">
                        <i class="fas fa-info-circle mr-2"></i>
                        Cliquez sur un élément du graphique pour afficher plus de détails
                    </div>
                </div>

                <!-- Information Panel -->
                <div class="col-span-1 md:col-span-4 order-2 border-t md:border-t-0 pt-6 md:pt-0 
                            dark:border-gray-700">
                    <ModuleInfoPanel
                        v-if="selectedModuleInfo && !selected.lesson"
                        :module-info="selectedModuleInfo"
                    />
                    
                    <LessonInfoPanel
                        v-if="selected.lesson && !selected.exercise"
                        :lesson="selected.lesson"
                    />
                    
                    <ExerciseInfoPanel
                        v-if="selected.exercise && selectedExerciseContent"
                        :exercise="selected.exercise"
                        :exercise-content="selectedExerciseContent"
                        :graph="graph"
                    />
                </div>
            </div>
        </div>
    </main>
    <main class="p-6 flex-grow dark:bg-gray-900" v-else>
        <h1 class="text-2xl font-bold mb-6 dark:text-white">Statistiques des erreurs</h1>
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 text-center">
            <i class="fas fa-exclamation-triangle text-4xl text-yellow-500"></i>
            <p class="text-lg mt-4 dark:text-gray-300">
                Vous n'avez pas encore de module pour afficher les statistiques
            </p>
        </div>
    </main>
</template>