<script setup>
const props = defineProps({
    results: {
        type: Object,
        required: true
    }
});

const isSuccess = () => {
    return props.results.status === 200 && props.results.error === '' && !props.results.output.includes('FAILURES!!!');
};

const getStatusIcon = () => {
    return isSuccess() ? 'fas fa-circle-check text-green-800 dark:text-green-500' : 'fas fa-circle-xmark text-red-800 dark:text-red-500';
};

const formatOutput = (text) => {
    return text.split('\n').filter(line => line.trim() !== '');
};
</script>

<template>
    <div class="p-4 dark:text-white shadow-md bg-white dark:bg-gray-900 font-mono">
        <div class="flex items-center gap-2 mb-4">
            <h2 class="text-lg font-bold">Console</h2>
            <i :class="[getStatusIcon(), 'text-lg']"></i>
        </div>
        
        <div class="console-content space-y-1">
            <!-- Output -->
            <template v-if="results.output">
                <div v-for="(line, index) in formatOutput(results.output)" 
                     :key="index"
                     :class="{
                         'text-green-800 dark:text-green-500': line.includes('OK'),
                         'text-red-800 dark:text-red-500': line.includes('FAILURES!!!') || line.includes('failure'),
                         'text-yellow-800 dark:text-yellow-500': line.includes('Time:')
                     }">
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
    </div>
</template>

<style scoped>
.console-content {
    font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
    white-space: pre-wrap;
    word-wrap: break-word;
}
</style>