import Repository from './repository.js';
import dict from './dict.js';
import helpers from './helpers.js';

Vue.use(VTooltip)

Vue.component('resource-bar', {
  props: ['resources', 'dict'],
  template: `
      <div class='resource-bar'>
        <span>{{ dict['resource.name.' + resources[0].id] }}{{ resources[0].amount }}</span>
        <span class='separator'>|</span>
        <span>{{ resources[1].amount }} {{ dict['resource.name.' + resources[1].id] }}</span>
      </div>
    `
})

Vue.component('building', {
  props: ['building', 'dict', 'helpers'],
  template: `
      <div class='building col-lg' v-bind:class='{inactive: !building.active}'>
        <div v-if='building.active'>
          <div class='info-wrapper'>
            <h2>{{ building.active ? dict['building.name.' + building.id] : '?' }}</h2>
            <span v-if='building.active'>&nbsp;<i v-tooltip.right='building.description' class='icofont-info-circle'></i></span>
            <ul class='properties'>
              <li v-for='(property, name) in building.properties'>
                <span v-if="(name != 'level' || !building.noLevels) && name != 'secondsToBuild'">{{ dict['building.property.' + name] }}: {{ property }}</span>
              </li>
            </ul>
          </div>
          <div v-if='building.active' class='icon icofont-3x' v-bind:class='building.icon'></div>
          <button type="button" class="btn btn-light btn-block btn-upgrade"
            v-bind:class='{ disabled: !building.canUpgrade || building.upgradeInProgress }'
            v-on:click="building.canUpgrade && !building.upgradeInProgress && building.upgrade()">
              {{ building.upgradeInProgress ? helpers.getTimeStr( building.properties.secondsToBuild ) : ( building.properties.level > 0 ? 'Upgrade' : 'Build' ) }}
          </button>
        </div>
        <div v-else class='placeholder'>
          <span class='icofont-question-square'></span>
        </div>
      </div>
    `
})

const app = new Vue({
  el: '#app',
  data: {
    gameName: 'Sunshine City, California',
    resources: Repository.getResourcesForView(),
    buildings: Repository.getBuildingsForView(),
    dict: dict,
    helpers: helpers
  },
  methods: {
    resetGame: function() {
      localStorage.clear();
      location.reload();
    }
  }
})