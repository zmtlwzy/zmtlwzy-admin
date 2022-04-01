import { mount } from '@vue/test-utils';
import { promiseTimeout } from '@vueuse/core';
import { describe, expect, it } from 'vitest';
import { NSwitch } from 'naive-ui';
import CountTo from '../src/components/CountTo/CountTo.vue';

describe('CountTo.vue', () => {
  it('should render', () => {
    const wrapper = mount(CountTo);
    expect(wrapper.text()).toContain('0');
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render different', async () => {
    const wrapper = mount(CountTo, { props: { endVal: 233333, isPlay: false } });
    expect(wrapper.text()).toContain('0');
    await promiseTimeout(100);
    expect(wrapper.html()).toMatchInlineSnapshot('"<span>0</span>"');
    await wrapper.setProps({ isPlay: true });
    await promiseTimeout(1300);
    expect(wrapper.html()).toMatchInlineSnapshot('"<span>233,333</span>"');
  });
});

describe('NSwitch.vue', () => {
  it('should be render', async () => {
    const wrapper = mount(NSwitch, { slots: { checked: 'on', unchecked: 'off' } });
    expect(wrapper.find('.n-switch__checked').exists()).toBe(true);
    expect(wrapper.find('.n-switch__unchecked').exists()).toBe(true);
  });

  it('should be interactive', async () => {
    const wrapper = mount(NSwitch, { props: { defaultValue: true } });
    expect(wrapper.attributes('aria-checked')).toBe('true');
    await wrapper.trigger('click');
    expect(wrapper.attributes('aria-checked')).toBe('false');
  });
});
