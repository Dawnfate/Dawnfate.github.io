//SubmitButton.vue
<template>
  <div>
    <span v-if="isAdmin">Admin Privileges</span>
    <span v-else>Not Authorized</span>
    <button>{{ msg }}</button>
  </div>
</template>

<script>
    export default {
        name: "SubmitButton",
        props: {
            msg: {
                type: String,
                required: true
            },
            isAdmin: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style scoped>
</style>


//SubmitButton.spec.js
import SubmitButton from "../../src/components/SubmitButton";
import {shallowMount} from "@vue/test-utils";

const msg = 'submit';
const factory = (propsData)=>{
    return shallowMount(SubmitButton,{
        //测试从父组件中接受属性（props）的组件
        propsData:{
            msg,
            ...propsData
        }
    })
}

describe('does not have admin privileges', () => {
    it('renders a message', () => {

        const wrapper = factory()

       expect(wrapper.find("span").text()).toBe('Not Authorized')
       expect(wrapper.find("button").text()).toBe('submit')
    })
})

describe('has admin privileges', () => {
    it('renders a message', () => {

        const wrapper = factory({isAdmin: true})

        expect(wrapper.find("span").text()).toBe('Admin Privileges')
        expect(wrapper.find("button").text()).toBe('submit')
    })
})
