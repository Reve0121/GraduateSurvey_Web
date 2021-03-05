<template>
    <div class="question flex-column">
        <h3>{{ data.serialNumber }} {{ data.question }}</h3>
         
        <el-radio-group v-model="value" class="flex-column ">
            <el-radio v-for="(answer,index) in answerList" :key="index" :label="answer.value" :value="answer.value">{{ answer.text }}</el-radio>
        </el-radio-group>
    </div>
</template>

<script>
export default {
    name: 'Question',
    props: {
        data: {
            type: Object,
            default: {}
        },
        result:{
            type:String
        }
    },
    data: function () {
        return {
            answerList: [],
            value:''
        };
    },
    watch:{
        value:function(oldVal,newVal){
            this.$emit('update:result', newVal)
        }
    },
    mounted: function () {
        this.value = this.$props.result
        this.init();
    },
    methods: {
        init() {
            this.answerList = [];
            for (let key in this.$props.data) {
                if (key.indexOf('answer') > -1) {
                    this.answerList.push({
                        "value":key,
                        "text": this.$props.data[key]
                    });
                }
            }
            console.log(this.answerList)
        }
    }
};
</script>
<style lang="scss" scoped>
</style>