<script
  setup
  lang="ts"
  generic="
    T extends {
      value: string;
      label: string;
      icon?: string;
      disabled?: boolean;
    }
  "
>
// Explicit IDs are assigned before rendering either trigger or panel. Keeping the
// panel mounted makes aria-controls valid on the server, after hydration, and closed.
const props = withDefaults(
  defineProps<{
    id: string;
    items: T[];
    type?: "single" | "multiple";
    collapsible?: boolean;
    defaultValue?: string | string[];
    modelValue?: string | string[];
    ui?: Partial<
      Record<
        | "root"
        | "item"
        | "header"
        | "trigger"
        | "label"
        | "leadingIcon"
        | "trailingIcon"
        | "content"
        | "body",
        string
      >
    >;
  }>(),
  { type: "single", collapsible: true },
);
const emit = defineEmits<{ "update:modelValue": [value: string | string[]] }>();
const internalValue = ref<string | string[]>(
  props.defaultValue ?? (props.type === "multiple" ? [] : ""),
);
const value = computed(() => props.modelValue ?? internalValue.value);
const isOpen = (item: T) =>
  Array.isArray(value.value)
    ? value.value.includes(item.value)
    : value.value === item.value;
const triggerId = (index: number) => `${props.id}-trigger-${index}`;
const panelId = (index: number) => `${props.id}-panel-${index}`;
function toggle(item: T) {
  if (
    item.disabled ||
    (!props.collapsible && isOpen(item) && props.type === "single")
  )
    return;
  const next =
    props.type === "multiple"
      ? isOpen(item)
        ? (value.value as string[]).filter((key) => key !== item.value)
        : [...(value.value as string[]), item.value]
      : isOpen(item)
        ? ""
        : item.value;
  internalValue.value = next;
  emit("update:modelValue", next);
}
function moveFocus(event: KeyboardEvent, index: number) {
  if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
  event.preventDefault();
  const indices = props.items
    .map((item, i) => (item.disabled ? -1 : i))
    .filter((i) => i >= 0);
  const current = indices.indexOf(index);
  const next =
    event.key === "Home"
      ? indices[0]
      : event.key === "End"
        ? indices.at(-1)
        : indices[
            (current + (event.key === "ArrowDown" ? 1 : -1) + indices.length) %
              indices.length
          ];
  if (next !== undefined) document.getElementById(triggerId(next))?.focus();
}
</script>

<template>
  <div :id="id" :class="ui?.root">
    <div
      v-for="(item, index) in items"
      :key="item.value"
      :class="ui?.item"
      :data-state="isOpen(item) ? 'open' : 'closed'"
    >
      <div :class="ui?.header">
        <button
          :id="triggerId(index)"
          type="button"
          :disabled="item.disabled"
          :aria-expanded="isOpen(item)"
          :aria-controls="panelId(index)"
          :data-state="isOpen(item) ? 'open' : 'closed'"
          class="group flex min-h-11 w-full items-center gap-2 rounded-sm text-start focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          :class="ui?.trigger"
          @click="toggle(item)"
          @keydown="moveFocus($event, index)"
        >
          <slot name="leading" :item="item" :index="index" :open="isOpen(item)">
            <UIcon
              v-if="item.icon"
              :name="item.icon"
              :class="ui?.leadingIcon"
            />
          </slot>
          <span class="min-w-0 flex-1 text-start" :class="ui?.label">{{
            item.label
          }}</span>
          <UIcon
            name="i-mdi-chevron-down"
            class="size-5 shrink-0"
            :class="[ui?.trailingIcon, { 'rotate-180': isOpen(item) }]"
          />
        </button>
      </div>
      <div
        :id="panelId(index)"
        role="region"
        :aria-labelledby="triggerId(index)"
        :hidden="!isOpen(item)"
        :data-state="isOpen(item) ? 'open' : 'closed'"
        :class="ui?.content"
      >
        <div :class="ui?.body">
          <slot name="body" :item="item" :index="index" :open="isOpen(item)" />
        </div>
      </div>
    </div>
  </div>
</template>
