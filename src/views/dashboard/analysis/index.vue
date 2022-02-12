<template>
  <PageWrapper>
    <div class="grid gap-4 grid-cols-3">
      <GrowCard class="col-span-full" />
      <SiteAnalysis class="col-span-full" />
      <NGrid cols="1 580:2" x-gap="16" y-gap="16" class="col-span-full lg:col-span-1">
        <NGi>
          <Gauge />
        </NGi>
        <NGi>
          <RingPie />
        </NGi>
      </NGrid>
      <BarLineMixChart height="100%" class="min-h-400px col-span-full lg:col-span-2" />
    </div>
  </PageWrapper>
</template>

<script setup lang="ts">
  import { useLoading } from './components/useLoading';
  import GrowCard from './components/GrowCard.vue';
  import SiteAnalysis from './components/SiteAnalysis.vue';
  import BarLineMixChart from './components/BarLineMixChart.vue';
  import Gauge from './components/Gauge.vue';
  import RingPie from './components/RingPie.vue';

  const loadingRef = useLoading();
  loadingRef.value = true;
</script>
