import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Plus, Trash2 } from 'lucide-react';
import { Field } from '@/components/editor/field';
import { Button } from '@/components/ui/button';
import { emptyListItem, MODULE_FIELDS, type ModuleKey } from '@/data/modules';

type Item = Record<string, unknown>;

function SortableItem({
  id,
  index,
  moduleKey,
  item,
  onChange,
  onRemove,
}: {
  id: string;
  index: number;
  moduleKey: ModuleKey;
  item: Item;
  onChange: (index: number, next: Item) => void;
  onRemove: (index: number) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className="mb-3 rounded-md border p-3"
    >
      <div className="mb-2 flex items-center justify-between">
        <button
          type="button"
          className="cursor-grab text-muted-foreground"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="size-4" />
        </button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => onRemove(index)}
        >
          <Trash2 className="size-4" />
        </Button>
      </div>
      <div className="space-y-3">
        {MODULE_FIELDS[moduleKey].map(field => (
          <Field
            key={field.attributeId}
            field={field}
            value={item[field.attributeId]}
            onChange={v =>
              onChange(index, { ...item, [field.attributeId]: v })
            }
          />
        ))}
      </div>
    </div>
  );
}

export function ListModule({
  moduleKey,
  items,
  onChange,
}: {
  moduleKey: ModuleKey;
  items: Item[];
  onChange: (items: Item[]) => void;
}) {
  const sensors = useSensors(useSensor(PointerSensor));
  const ids = items.map((_, i) => `${moduleKey}-${i}`);

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = ids.indexOf(String(active.id));
    const newIndex = ids.indexOf(String(over.id));
    onChange(arrayMove(items, oldIndex, newIndex));
  };

  return (
    <div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={onDragEnd}
      >
        <SortableContext items={ids} strategy={verticalListSortingStrategy}>
          {items.map((item, index) => (
            <SortableItem
              key={ids[index]}
              id={ids[index]}
              index={index}
              moduleKey={moduleKey}
              item={item}
              onChange={(i, next) => {
                const copy = items.slice();
                copy[i] = next;
                onChange(copy);
              }}
              onRemove={i => onChange(items.filter((_, idx) => idx !== i))}
            />
          ))}
        </SortableContext>
      </DndContext>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => onChange([...items, emptyListItem(moduleKey)])}
      >
        <Plus className="size-4" />
        添加
      </Button>
    </div>
  );
}
