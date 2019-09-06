import Repository from './repository.js';
import helpers from './helpers.js';

Vue.use(VTooltip);
Vue.use(Toasted);

let buildFinishedToastOptions = {
  duration: 5000,
  position: 'bottom-right',
  keepOnHover: true,
  className: 'toast',
  theme: 'outline',
  iconPack: 'fontawesome',
  icon: 'check-circle'
}

Vue.toasted.register('build_finished', (payload) => {
  return payload.message;
}, buildFinishedToastOptions);

let hintToastOptions = {
  position: 'bottom-right',
  keepOnHover: true,
  className: 'toast',
  theme: 'outline',
  iconPack: 'fontawesome',
  icon: 'hand-point-up',
  action: {
    text: helpers.getStr('toast.close'),
    onClick: (e, toastObject) => {
      toastObject.goAway(0);
    }
  }
}

Vue.toasted.register('hint', (payload) => {
  return payload.message;
}, hintToastOptions);

Vue.component('resource-bar', {
  props: ['resources', 'helpers'],
  template: `
      <div class='resource-bar'>
        <span>{{ helpers.getStr('resource.name.' + resources[0].id) }}{{ resources[0].amount }}</span>
        <span class='separator'>|</span>
        <span>{{ resources[1].amount }} {{ helpers.getStr('resource.name.' + resources[1].id + (resources[1].amount > 1 ? '.plural' : '.singular')) }}</span>
      </div>
    `
})

Vue.component('building', {
  props: ['building', 'helpers'],
  template: `
      <div class='building col-lg' v-bind:class='{inactive: !building.active}'>
        <div v-if='building.active'>
          <div class='info-wrapper'>
            <h2>{{ helpers.getBuildingName(building.id) }}</h2>
            <span>&nbsp;<i v-tooltip.right="helpers.getStr('building.description.' + building.id)" class='icofont-info-circle'></i></span>
            <ul class='properties'>
              <li v-for='(property, name) in building.properties'>
                <span v-if="(name != 'level' || !building.noLevels) && name != 'secondsToBuild'">{{ helpers.getStr('building.property.' + name) }}: {{ property }}</span>
              </li>
            </ul>
          </div>
          <div class='icon' v-bind:class='building.icon'></div>
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
    helpers: helpers
  },
  methods: {
    resetGame: function() {
      localStorage.clear();
      location.reload();
    }
  }
})