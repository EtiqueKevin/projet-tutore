<script setup>
const props = defineProps({
    results: {
        type: Object,
        required: false,
        default: null
    },
    language: {
        type: String,
        required: false,
        default: 'java'
    }
});

const isSuccess = () => {
    if (!props.results) return false;
    
    if (props.language === 'python') {
        return props.results.status === 200 && 
               props.results.error === '';
    }
    
    return props.results.status === 200 && 
           props.results.error === '';
};

const getStatusIcon = () => {
    if(!props.results) return 'fas fa-circle-minus text-yellow-500 dark:text-yellow-500';
    if(props.results.error === '' && props.results.output === '') return 'hidden';

    return isSuccess() ? 'fas fa-circle-check text-green-800 dark:text-green-500' : 'fas fa-circle-xmark text-red-800 dark:text-red-500';
};

const formatOutput = (text) => {
    return text.split('\n').filter(line => line.trim() !== '');
};

const getLineClass = (line) => {
    // Common success patterns
    if (line.includes('OK') || line.includes('xpassed')) {
        return 'text-green-800 dark:text-green-500';
    }
    
    // Time information
    if (line.includes('Time:') || 
        line.includes('test session starts') ||
        line.includes('collected')) {
        return 'text-yellow-800 dark:text-yellow-500';
    }
    
    return '';
};
</script>

<template>
    <div class="p-4 dark:text-white shadow-md bg-white dark:bg-gray-900 font-mono flex flex-col overflow-y-scroll">
        <div class="flex items-center gap-2 mb-4">
            <h2 class="text-lg font-bold">Console</h2>
            <i :class="[getStatusIcon(), 'text-lg']"></i>
        </div>
        
        <div class="console-content space-y-1" v-if="results">
            <!-- Output -->
            <template v-if="results.output">
                <div v-for="(line, index) in formatOutput(results.output)" 
                     :key="index"
                     :class="getLineClass(line)">
                    {{ line }}
                </div>
            </template>

            <!-- Error -->
            <template v-if="results.error">
                <div class="text-red-500">
                    <div v-for="(line, index) in formatOutput(results.error)" 
                         :key="index">
                        {{ line }}
                    </div>
                </div>
            </template>
        </div>

        <div v-else class="console-content flex justify-center items-center flex-grow">
            <i class="fas fa-hourglass-start fa-flip text-blue-500 text-5xl" style="--fa-flip-x: 1; --fa-flip-y: 0; --fa-animation-duration: 1.75s;"></i>
        </div>
    </div>
</template>