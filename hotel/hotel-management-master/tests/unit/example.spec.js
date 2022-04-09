// import { shallowMount } from '@vue/test-utils';
// import HelloWorld from '@/components/HelloWorld.vue';

// describe('HelloWorld.vue', () => {
//     it('renders props.msg when passed', () => {
//         const msg = 'new message';
//         const wrapper = shallowMount(HelloWorld, {
//             props: { msg },
//         });
//         expect(wrapper.text()).toMatch(msg);
//     });
// });

import SubmitButton from "../../src/components/HelloWorld";
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

