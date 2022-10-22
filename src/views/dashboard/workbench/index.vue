<template>
  <PageWrapper>
    <template #headerContent>
      <WorkbenchHeader />
    </template>

    <div class="grid lg:grid-cols-[7fr_3fr] gap-4">
      <div class="flex flex-col space-y-4">
        <ProjectCard />
        <Dynamicinfo />
      </div>
      <div class="flex flex-col space-y-4">
        <QuickNav />
        <WorkbenchRadar />
        <TeamCard />
      </div>
    </div>
  </PageWrapper>
</template>

<script setup lang="ts">
import { useLoading } from './components/useLoading'
import WorkbenchHeader from './components/WorkbenchHeader.vue'
import ProjectCard from './components/ProjectCard.vue'
import Dynamicinfo from './components/Dynamicinfo.vue'
import QuickNav from './components/QuickNav.vue'
import TeamCard from './components/TeamCard.vue'
import WorkbenchRadar from './components/WorkbenchRadar.vue'

const loadingRef = useLoading()
loadingRef.value = true
</script>
