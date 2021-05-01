<!--
 * @Author: your name
 * @Date: 2021-04-23 15:21:44
 * @LastEditTime: 2021-05-01 23:42:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /envi-ux/Users/chenglei/work/dapp-demo/src/views/TodoList/index.vue
-->
<template>
    <el-container>
        <el-header>
            <el-row>
                <el-col :span="12" :offset="6">
                    <el-form ref="form" :model="form" label-width="80px" @submit.prevent="() => false">
                        <el-form-item label="账户地址">
                            <div>{{ account }}</div>
                        </el-form-item>
                        <el-form-item label="账户余额">
                            {{ balance }}
                        </el-form-item>
                        <el-form-item label="任务名称">
                            <el-input @keyup.enter="createTask(inputVlaue)" v-model="inputVlaue"></el-input>
                        </el-form-item>
                        <el-radio-group v-model="display" @change="changeDisplay">
                            <el-radio label="">全部({{ allNum }})</el-radio>
                            <el-radio label="todo">未完成({{ noneNum }})</el-radio>
                            <el-radio label="deno">已完成({{ doneNum }})</el-radio>
                        </el-radio-group>
                    </el-form>
                    <div v-if="todoList.length > 0">
                        <template v-for="v in todoList" :key="v.id">
                            <div class="item" v-if="display === ''" style="text-align: left;">
                                <el-checkbox v-model="v.completed" :label="v.content" @change="toggleCompleted(v.id)">
                                    <span :class="{ done: v.completed }">{{ v.content }}</span>
                                </el-checkbox>
                                <el-button type="danger" icon="el-icon-delete" circle @click="deleteList(v)">
                                </el-button>
                            </div>
                            <div class="item" v-else-if="display === 'todo' && !v.completed">
                                <el-checkbox v-model="v.completed" :label="v.content" @change="toggleCompleted(v.id)">
                                    <span :class="{ done: v.completed }">{{ v.content }}</span>
                                </el-checkbox>
                                <el-button type="danger" icon="el-icon-delete" circle @click="deleteList(v)">
                                </el-button>
                            </div>
                            <div class="item" v-else-if="display === 'deno' && v.completed">
                                <el-checkbox v-model="v.completed" :label="v.content" @change="toggleCompleted(v.id)">
                                    <span :class="{ done: v.completed }">{{ v.content }}</span>
                                </el-checkbox>
                                <el-button type="danger" icon="el-icon-delete" circle @click="deleteList(v)">
                                </el-button>
                            </div>
                        </template>
                    </div>
                </el-col>
            </el-row>
        </el-header>
    </el-container>
</template>

<script>
import { defineComponent, reactive, toRefs, ref, computed } from 'vue'
// import todoConTracts from '@/contracts/TodoList.json'
import todoAbi from '../../../build/contracts/todo.json'
import '@truffle/contract/dist/truffle-contract'
import * as R from 'ramda'
export default defineComponent({
    setup() {
        let web3 = null
        let MyContract = null
        let acccounts = null
        const account = ref('')
        const balance = ref('')
        const form = reactive({
            inputVlaue: '',
            todoList: []
        })
        const display = ref('')
        const getTaskCount = async () => {
            console.log(MyContract)
            try {
                return await MyContract.methods.taskCount().call()
            } catch (err) {
                console.error(err)
            }
        }
        // const events = async () => {
        //     await MyContract.events.TaskCreated({}, res => {
        //         console.log(res)
        //     })
        // }
        const loadTodoList = async () => {
            const taskCount = await getTaskCount()
            form.todoList = []
            for (let i = 1; i <= taskCount; i++) {
                const task = await MyContract.methods.tasks(i).call()
                form.todoList.push(task)
            }
        }

        // 创建任务
        const createTask = async v => {
            try {
                await MyContract.methods.createTask(v).send({ from: acccounts })
                form.inputVlaue = ''
                loadTodoList()
            } catch (err) {
                console.error(err)
            }
        }
        const changeDisplay = v => {
            console.log(v)
            console.log(display.value)
        }
        const deleteList = v => {
            const ids = R.map(R.prop('id'))(form.todoList)
            if (ids.includes(v.id)) {
                form.todoList.splice(ids.indexOf(v.id), 1)
            }
        }
        const allNum = computed(() => {
            return form.todoList.length
        })
        const noneNum = computed(() => {
            return R.filter(R.propEq('completed', false), form.todoList).length
        })
        const doneNum = computed(() => {
            return R.filter(R.propEq('completed', true), form.todoList).length
        })

        // 完成任务
        const toggleCompleted = async id => {
            await MyContract.methods.toggleCompleted(id).send({ from: acccounts })
            loadTodoList()
        }
        // 设置meatmask账户
        const getAcccounts = async () => {
            const acc = await web3.eth.getAccounts()
            if (acc.length > 0) {
                acccounts = acc[0]
                console.log(acccounts)
                account.value = acc[0]
                console.log(account)
            } else {
                console.error('无账户')
            }
        }

        // 获取区块余额
        const getBalance = async () => {
            const address = MyContract.options.address
            const bal = await web3.eth.getBalance(address)
            balance.value = bal
        }
        const web3Action = {
            initWeb3: async () => {
                // Modern dapp browsers...
                if (window.ethereum) {
                    window.web3Provider = window.ethereum
                    try {
                        // Request account access if needed
                        await window.ethereum.enable()
                        // Acccounts now exposed
                        // window.web3.eth.sendTransaction({
                        //     /* ... */
                        // })
                    } catch (error) {
                        // User denied account access...
                    }
                } else if (window.web3) {
                    window.web3Provider = window.web3.currentProvider
                } else {
                    window.web3Provider = new window.Web3(
                        new window.Web3.providers.HttpProvider(
                            'https://kovan.infura.io/v3/adf650a437394a8fa2f142f1dc124e49'
                        )
                    )
                }
                // window.web3Provider = new window.Web3(
                //     new window.Web3.providers.HttpProvider(
                //         'https://kovan.infura.io/v3/adf650a437394a8fa2f142f1dc124e49'
                //     )
                // )
                web3 = new window.Web3(window.web3Provider)

                // Acccounts always exposed
                // window.web3.eth.sendTransaction({
                //     /* ... */
                // })
            },
            loadContract: async () => {
                // Create a JavaScript version of the smart contract
                MyContract = new web3.eth.Contract(todoAbi, '0xF950D21Cf40b42Bb916eB86BC69ae77DB4F773De', {
                    from: acccounts
                })
                // const balance = await web3.eth.getBalance(coinbase)
                // console.log(balance)
                // const MyContract = window.TruffleContract(todoConTracts)
                // MyContract.setProvider(window.web3Provider)
                // const aa = MyContract.deployed()
                // console.log(MyContract)
                // const receipt = await MyContract.methods.tasks(2).call()
                // .on('TaskCreated', res => {
                //     console.log(res)
                // })
                // console.log(receipt)
                // const contractInstance = MyContract.deployed()
                // console.log(contractInstance)
                // contractInstance.getAdopters.call()
                // console.log(todo)
            }
            // loadAccount: async () => {
            //     // Set the current blockchain account
            //     // console.log(window.web3Provider)
            //     account = await window.web3Provider.request({ method: 'eth_accounts' })
            //     console.log(account)
            // }
        }

        // const renderTasks = async () => {
        //     // Load the total task count from the blockchain
        //     const taskCount = await todo.taskCount()

        //     // Render out each task with a new task template
        //     for (let i = 1; i <= taskCount; i++) {
        //         // Fetch the task data from the blockchain
        //         const task = await todo.tasks(i)
        //         const taskId = task[0].toNumber()
        //         const taskContent = task[1]
        //         const taskCompleted = task[2]
        //         todoList.push({
        //             id: taskId,
        //             name: taskContent,
        //             completed: taskCompleted
        //         })
        //         // Create the html for the task

        //         // Show the task
        //     }
        // }
        const loadweb3 = async () => {
            await web3Action.initWeb3()
            await getAcccounts()
            await web3Action.loadContract()
            await getBalance()
            loadTodoList()
            // events()
            // await web3Action.loadAccount()
        }
        loadweb3()
        return {
            display,
            form,
            balance,
            toggleCompleted,
            deleteList,
            createTask,
            acccounts,
            changeDisplay,
            allNum,
            account,
            noneNum,
            doneNum,
            ...toRefs(form)
        }
    }
})
</script>

<style lang="postcss">
.done {
    text-decoration: line-through;
}
.item {
    line-height: 50px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: flex-start;
}
</style>
