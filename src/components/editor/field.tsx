import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import type { FieldSchema } from '@/data/modules';

type Props = {
  field: FieldSchema;
  value: unknown;
  onChange: (value: unknown) => void;
};

function asTimeString(value: unknown): string {
  if (Array.isArray(value)) {
    return value.filter(v => v != null && v !== '').join(' - ');
  }
  if (value == null) return '';
  return String(value);
}

function parseTimeString(raw: string): [string, string] | string {
  const parts = raw.split(/\s*[-~～]\s*/).map(s => s.trim());
  if (parts.length >= 2) return [parts[0], parts[1]];
  return raw;
}

export function Field({ field, value, onChange }: Props) {
  const id = field.attributeId;
  const isRange = id === 'edu_time' || id === 'work_time';

  return (
    <div className="space-y-1.5">
      {field.displayName && field.type !== 'checkbox' && (
        <Label htmlFor={id}>{field.displayName}</Label>
      )}
      {field.type === 'textarea' && (
        <Textarea
          id={id}
          value={String(value ?? '')}
          placeholder={field.placeholder}
          onChange={e => onChange(e.target.value)}
        />
      )}
      {field.type === 'input' && (
        <Input
          id={id}
          value={isRange ? asTimeString(value) : String(value ?? '')}
          placeholder={
            field.placeholder ?? (isRange ? '2020.01 - 2022.06 或 至今' : undefined)
          }
          onChange={e =>
            onChange(isRange ? parseTimeString(e.target.value) : e.target.value)
          }
        />
      )}
      {field.type === 'select' && (
        <select
          id={id}
          className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm"
          value={String(value ?? field.options?.[0]?.value ?? '')}
          onChange={e => onChange(e.target.value)}
        >
          {field.options?.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}
      {field.type === 'checkbox' && (
        <label className="flex items-center gap-2 text-sm">
          <Checkbox
            checked={Boolean(value)}
            onCheckedChange={checked => onChange(checked === true)}
          />
          {field.displayName}
        </label>
      )}
      {field.type === 'number' && (
        <div className="flex items-center gap-3">
          <Slider
            min={field.min ?? 0}
            max={field.max ?? 100}
            step={field.step ?? 1}
            value={[Number(value ?? 0)]}
            onValueChange={vals => onChange(vals[0])}
          />
          <span className="w-10 text-right text-xs text-muted-foreground">
            {Number(value ?? 0)}%
          </span>
        </div>
      )}
    </div>
  );
}
