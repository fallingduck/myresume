import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Field } from '@/components/editor/field';
import { ListModule } from '@/components/editor/list-module';
import { MODULE_FIELDS, MODULE_META, moduleTitle } from '@/data/modules';
import type { ResumeConfig, ThemeConfig } from '@/types/resume';

type Props = {
  config: ResumeConfig;
  theme: ThemeConfig;
  onConfigChange: (next: ResumeConfig) => void;
  onThemeChange: (next: ThemeConfig) => void;
};

export function EditorSheet({
  config,
  theme,
  onConfigChange,
  onThemeChange,
}: Props) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="w-[106px]">编辑内容</Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[420px] overflow-y-auto sm:max-w-[420px]"
      >
        <SheetHeader>
          <SheetTitle>编辑简历</SheetTitle>
          <SheetDescription>修改后会自动缓存在本地。</SheetDescription>
        </SheetHeader>
        <div className="space-y-4 px-4 pb-8">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="theme-color">主题色</Label>
              <Input
                id="theme-color"
                type="color"
                value={theme.color}
                onChange={e =>
                  onThemeChange({ ...theme, color: e.target.value })
                }
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="theme-tag">标签色</Label>
              <Input
                id="theme-tag"
                type="color"
                value={theme.tagColor}
                onChange={e =>
                  onThemeChange({ ...theme, tagColor: e.target.value })
                }
              />
            </div>
          </div>
          <Accordion type="multiple" className="w-full">
            {MODULE_META.map(mod => (
              <AccordionItem key={mod.key} value={mod.key}>
                <AccordionTrigger>{moduleTitle(mod.key, config.titleNameMap)}</AccordionTrigger>
                <AccordionContent>
                  {mod.list ? (
                    <ListModule
                      moduleKey={mod.key}
                      items={
                        (config[mod.key] as Array<Record<string, unknown>>) ?? []
                      }
                      onChange={items =>
                        onConfigChange({ ...config, [mod.key]: items })
                      }
                    />
                  ) : (
                    <div className="space-y-3">
                      {MODULE_FIELDS[mod.key].map(field => {
                        const group = (config[mod.key] ?? {}) as Record<
                          string,
                          unknown
                        >;
                        return (
                          <Field
                            key={field.attributeId}
                            field={field}
                            value={group[field.attributeId]}
                            onChange={v =>
                              onConfigChange({
                                ...config,
                                [mod.key]: { ...group, [field.attributeId]: v },
                              })
                            }
                          />
                        );
                      })}
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </SheetContent>
    </Sheet>
  );
}
