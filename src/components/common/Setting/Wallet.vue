<script lang="ts" setup>
import { ref } from 'vue'
import { NButton, NInputNumber, useMessage } from 'naive-ui'
import { useBasicLayout } from '@/hooks/useBasicLayout'
import { t } from '@/locales'

const { isMobile } = useBasicLayout()
const message = useMessage()
const rechargeValue = ref(10.00)

function toCharge(amount: number) {
  if (amount < 5) {
    message.info(
      t('setting.rechargeLimit', { msg: '5.00$' }),
      {
        keepAliveOnHover: true,
      },
    )
  }

  rechargeValue.value = amount
}

function doCharge() {
  message.info(`${rechargeValue.value}`)
}
</script>

<template>
  <div class="p-4 space-y-5 min-h-[200px]">
    <div class="space-y-6">
      <div
        class="flex items-center space-x-4"
        :class="isMobile && 'items-start'"
      >
        <span class="flex-shrink-0 w-[100px]">{{ $t('setting.balance') }}</span>
        <div class="flex flex-wrap items-center gap-4">
          $ 0.00
        </div>
      </div>
    </div>
    <div class="space-y-6">
      <div
        class="flex items-center space-x-4"
        :class="isMobile && 'items-start'"
      >
        <span class="flex-shrink-0 w-[100px]">{{ $t('setting.recharge') }}</span>

        <div class="flex flex-wrap items-center gap-4">
          <NButton @click="toCharge(5.00)">
            $ 5.00
          </NButton>
          <NButton @click="toCharge(15.00)">
            $ 15.00
          </NButton>
          <NButton @click="toCharge(30.00)">
            $ 30.00
          </NButton>
          <NButton @click="toCharge(50.00)">
            $ 50.00
          </NButton>
        </div>
      </div>
    </div>
    <div class="flex items-center space-x-4">
      <span class="flex-shrink-0 w-[100px]" />
      <div class="flex flex-wrap items-center gap-4">
        <NInputNumber v-model:value="rechargeValue" :min="5" :max="9999" style="width: 120px;">
          <template #prefix>
            $
          </template>
        </NInputNumber>
        <NButton type="primary" @click="doCharge">
          {{ $t('setting.recharge') }}
        </NButton>
      </div>
    </div>
  </div>
</template>
