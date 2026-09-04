export type ResumeConfig = {
  avatar?: {
    src?: string;
    shape?: string;
    size?: string;
    hidden?: boolean;
  };
  profile?: {
    name: string;
    mobile?: string;
    email?: string;
    github?: string;
    zhihu?: string;
    workExpYear?: string;
    workPlace?: string;
    positionTitle?: string;
  };
  titleNameMap?: {
    educationList?: string;
    workExpList?: string;
    projectList?: string;
    skillList?: string;
    awardList?: string;
    workList?: string;
    aboutme?: string;
  };
  educationList?: Array<{
    edu_time: [string | undefined, string | number];
    school: string;
    major?: string;
    academic_degree?: string;
  }>;
  workExpList?: Array<{
    company_name: string;
    department_name: string;
    work_time?: [string | undefined, string | number];
    work_desc: string;
  }>;
  projectList?: Array<{
    project_name: string;
    project_role: string;
    project_desc?: string;
    project_content?: string;
    project_time?: string;
  }>;
  skillList?: Array<{
    skill_name?: string;
    skill_level?: number;
    skill_desc?: string;
  }>;
  awardList?: Array<{
    award_info: string;
    award_time?: string;
  }>;
  workList?: Array<{
    work_name?: string;
    work_desc?: string;
    visit_link?: string;
  }>;
  aboutme?: {
    aboutme_desc: string;
  };
  locales?: {
    [key: string]: ResumeConfig;
  };
  template?: string;
};

export type ThemeConfig = {
  color: string;
  tagColor: string;
};

export const DEFAULT_THEME: ThemeConfig = {
  color: '#2f5785',
  tagColor: '#8bc34a',
};

export const DEFAULT_TITLE_NAME_MAP: NonNullable<ResumeConfig['titleNameMap']> =
  {
    educationList: '教育背景',
    workExpList: '工作经历',
    projectList: '项目经历',
    skillList: '个人技能',
    awardList: '更多信息',
    workList: '个人作品',
    aboutme: '自我介绍',
  };
