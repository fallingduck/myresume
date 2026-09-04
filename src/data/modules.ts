import type { ResumeConfig } from '@/types/resume';

export type ModuleKey =
  | 'avatar'
  | 'profile'
  | 'educationList'
  | 'aboutme'
  | 'awardList'
  | 'workList'
  | 'skillList'
  | 'workExpList'
  | 'projectList';

export type FieldType =
  | 'input'
  | 'textarea'
  | 'checkbox'
  | 'select'
  | 'number'
  | 'image';

export type FieldSchema = {
  type: FieldType;
  attributeId: string;
  displayName?: string;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
  min?: number;
  max?: number;
  step?: number;
};

export const MODULE_META: Array<{
  key: ModuleKey;
  name: string;
  list?: boolean;
}> = [
  { key: 'avatar', name: '头像设置' },
  { key: 'profile', name: '个人信息' },
  { key: 'educationList', name: '教育背景', list: true },
  { key: 'aboutme', name: '自我介绍' },
  { key: 'awardList', name: '更多信息', list: true },
  { key: 'workList', name: '个人作品', list: true },
  { key: 'skillList', name: '专业技能', list: true },
  { key: 'workExpList', name: '工作经历', list: true },
  { key: 'projectList', name: '项目经历', list: true },
];

export const MODULE_FIELDS: Record<ModuleKey, FieldSchema[]> = {
  avatar: [
    { type: 'checkbox', attributeId: 'hidden', displayName: '隐藏头像' },
    {
      type: 'image',
      attributeId: 'src',
      displayName: '头像图片',
      placeholder: '也可以粘贴图片 URL',
    },
    {
      type: 'select',
      attributeId: 'shape',
      displayName: '头像形状',
      options: [
        { value: 'circle', label: '圆形' },
        { value: 'square', label: '方形' },
      ],
    },
  ],
  profile: [
    { type: 'input', attributeId: 'name', displayName: '姓名' },
    { type: 'input', attributeId: 'mobile', displayName: '手机号码' },
    { type: 'input', attributeId: 'email', displayName: '邮箱' },
    { type: 'input', attributeId: 'github', displayName: 'Github' },
    { type: 'input', attributeId: 'zhihu', displayName: '知乎' },
    { type: 'input', attributeId: 'workExpYear', displayName: '工作经验' },
    { type: 'input', attributeId: 'workPlace', displayName: '期望工作地' },
    { type: 'input', attributeId: 'positionTitle', displayName: '职位' },
  ],
  educationList: [
    { type: 'input', attributeId: 'edu_time', displayName: '起止时间' },
    { type: 'input', attributeId: 'school', displayName: '学校' },
    { type: 'input', attributeId: 'major', displayName: '专业' },
    { type: 'input', attributeId: 'academic_degree', displayName: '学历' },
  ],
  aboutme: [
    { type: 'textarea', attributeId: 'aboutme_desc', displayName: '自我介绍' },
  ],
  awardList: [
    { type: 'input', attributeId: 'award_time', displayName: '获奖时间' },
    { type: 'input', attributeId: 'award_info', displayName: '奖项内容' },
  ],
  workList: [
    { type: 'input', attributeId: 'work_name', displayName: '作品名称' },
    { type: 'input', attributeId: 'work_desc', displayName: '作品描述' },
    { type: 'input', attributeId: 'visit_link', displayName: '作品链接' },
  ],
  skillList: [
    { type: 'input', attributeId: 'skill_name', displayName: '技能项' },
    {
      type: 'number',
      attributeId: 'skill_level',
      displayName: '掌握程度',
      min: 0,
      max: 100,
      step: 20,
    },
    { type: 'textarea', attributeId: 'skill_desc', displayName: '技能描述' },
  ],
  workExpList: [
    { type: 'input', attributeId: 'work_time', displayName: '起止时间' },
    { type: 'input', attributeId: 'company_name', displayName: '公司名称' },
    { type: 'input', attributeId: 'department_name', displayName: '部门' },
    { type: 'textarea', attributeId: 'work_desc', displayName: '职位或描述' },
  ],
  projectList: [
    { type: 'input', attributeId: 'project_time', displayName: '起止时间' },
    { type: 'input', attributeId: 'project_name', displayName: '项目名称' },
    { type: 'input', attributeId: 'project_role', displayName: '担任角色' },
    { type: 'textarea', attributeId: 'project_desc', displayName: '项目描述' },
    { type: 'textarea', attributeId: 'project_content', displayName: '主要工作' },
  ],
};

export function emptyListItem(key: ModuleKey): Record<string, unknown> {
  switch (key) {
    case 'educationList':
      return { edu_time: ['', ''], school: '', major: '', academic_degree: '' };
    case 'awardList':
      return { award_info: '', award_time: '' };
    case 'workList':
      return { work_name: '', work_desc: '', visit_link: '' };
    case 'skillList':
      return { skill_name: '', skill_level: 60, skill_desc: '' };
    case 'workExpList':
      return {
        company_name: '',
        department_name: '',
        work_time: ['', ''],
        work_desc: '',
      };
    case 'projectList':
      return {
        project_name: '',
        project_role: '',
        project_time: '',
        project_desc: '',
        project_content: '',
      };
    default:
      return {};
  }
}

export function moduleTitle(
  key: ModuleKey,
  titleNameMap?: ResumeConfig['titleNameMap']
): string {
  const mapped = titleNameMap?.[key as keyof NonNullable<ResumeConfig['titleNameMap']>];
  if (mapped) return mapped;
  return MODULE_META.find(m => m.key === key)?.name ?? key;
}
