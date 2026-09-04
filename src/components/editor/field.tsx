import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ImagePlus, X } from 'lucide-react';
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
  const [imageError, setImageError] = useState<string | null>(null);
  const id = field.attributeId;
  const isRange = id === 'edu_time' || id === 'work_time';

  const onImageSelect = (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setImageError('请选择图片文件');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImageError(null);
      onChange(String(reader.result));
    };
    reader.onerror = () => setImageError('图片读取失败，请重试');
    reader.readAsDataURL(file);
  };

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
      {field.type === 'image' && (
        <div className="space-y-2">
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => document.getElementById(`${id}-file`)?.click()}
            >
              <ImagePlus className="size-4" />
              选择本地图片
            </Button>
            {!!value && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="清除头像"
                title="清除头像"
                onClick={() => {
                  setImageError(null);
                  onChange('');
                }}
              >
                <X className="size-4" />
              </Button>
            )}
            <input
              id={`${id}-file`}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={event => {
                onImageSelect(event.target.files?.[0]);
                event.target.value = '';
              }}
            />
          </div>
          <Input
            id={id}
            value={String(value ?? '')}
            placeholder={field.placeholder}
            onChange={event => {
              setImageError(null);
              onChange(event.target.value);
            }}
          />
          {!!value && (
            <img
              src={String(value)}
              alt="头像预览"
              className="size-16 rounded-md border object-cover"
            />
          )}
          {imageError && (
            <p className="text-xs text-destructive">{imageError}</p>
          )}
          <p className="text-xs text-muted-foreground">
            图片会以内嵌数据保存在当前配置中，不会上传到服务器。
          </p>
        </div>
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
