import type { ReactNode } from 'react';
import {
  Calendar,
  CheckCircle2,
  Crown,
  Github,
  Heart,
  Mail,
  MapPin,
  Phone,
  Trophy,
} from 'lucide-react';
import {
  DEFAULT_TITLE_NAME_MAP,
  type ResumeConfig,
  type ThemeConfig,
} from '@/types/resume';
import './template3.css';

type Props = {
  value: ResumeConfig;
  theme: ThemeConfig;
};

function formatRange(
  time: [string | undefined, string | number] | string | undefined
): string {
  if (!time) return '';
  if (typeof time === 'string') {
    const [start, end] = time.split(',');
    return end ? `${start} ~ ${end}` : `${start} ~ 至今`;
  }
  const [start, end] = time;
  if (!start && !end) return '';
  if (!end || end === '至今' || end === 'null') return `${start ?? ''} ~ 至今`;
  return `${start ?? ''} ~ ${end}`;
}

function RibbonCard({
  title,
  color,
  className,
  children,
}: {
  title: string;
  color: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`ribbon-card section ${className ?? ''}`}>
      <div className="ribbon-title" style={{ background: color }}>
        {title}
      </div>
      <div className="ribbon-body">{children}</div>
    </div>
  );
}

function Stars({ level, color }: { level: number; color: string }) {
  const value = Math.max(0, Math.min(5, level / 20));
  return (
    <span className="skill-rate" aria-label={`${level}%`}>
      {Array.from({ length: 5 }, (_, i) => {
        const fill = Math.max(0, Math.min(1, value - i));
        return (
          <span key={i} className="skill-star">
            ★
            <span
              className="skill-star-fill"
              style={{ width: `${fill * 100}%`, color }}
            >
              ★
            </span>
          </span>
        );
      })}
    </span>
  );
}

export function Template3({ value, theme }: Props) {
  const titles = { ...DEFAULT_TITLE_NAME_MAP, ...value.titleNameMap };
  const profile = value.profile;
  const aboutme = (value.aboutme?.aboutme_desc ?? '').split('\n');
  const showAvatar = value.avatar && !value.avatar.hidden && value.avatar.src;

  return (
    <div className="template3-resume resume-content">
      <div className="basic-info">
        {showAvatar && (
          <img
            src={value.avatar!.src}
            alt={profile?.name ?? 'avatar'}
            className={`avatar ${
              value.avatar?.shape === 'square' ? 'is-square' : 'is-circle'
            }`}
          />
        )}
        <div className="profile">
          {profile?.name && <div className="name">{profile.name}</div>}
          <div className="profile-list">
            {profile?.mobile && (
              <div>
                <Phone
                  className="profile-icon size-3.5"
                  style={{ color: theme.color }}
                />
                {profile.mobile}
              </div>
            )}
            {profile?.email && (
              <div>
                <Mail
                  className="profile-icon size-3.5"
                  style={{ color: theme.color }}
                />
                {profile.email}
              </div>
            )}
            {profile?.github && (
              <div>
                <Github
                  className="profile-icon size-3.5"
                  style={{ color: theme.color }}
                />
                <button
                  type="button"
                  className="link-btn"
                  onClick={() => window.open(profile.github)}
                >
                  {profile.github}
                </button>
              </div>
            )}
            {profile?.zhihu && (
              <div>
                <Crown
                  className="profile-icon size-3.5"
                  style={{ color: theme.color }}
                />
                <button
                  type="button"
                  className="link-btn"
                  onClick={() => window.open(profile.zhihu)}
                >
                  {profile.zhihu}
                </button>
              </div>
            )}
            {profile?.workExpYear && (
              <div>
                <Calendar
                  className="profile-icon size-3.5"
                  style={{ color: theme.color }}
                />
                <span>工作经验: {profile.workExpYear}</span>
              </div>
            )}
            {profile?.workPlace && (
              <div>
                <MapPin
                  className="profile-icon size-3.5"
                  style={{ color: theme.color }}
                />
                <span>期望工作地: {profile.workPlace}</span>
              </div>
            )}
            {profile?.positionTitle && (
              <div>
                <Heart
                  className="profile-icon size-3.5"
                  style={{ color: theme.color }}
                />
                <span>职位: {profile.positionTitle}</span>
              </div>
            )}
          </div>
        </div>

        {value.educationList?.length ? (
          <RibbonCard
            title={titles.educationList!}
            color={theme.color}
            className="section-education"
          >
            {value.educationList.map((edu, idx) => (
              <div key={idx} className="education-item">
                <div>
                  <span>
                    <b>{edu.school}</b>
                    {edu.major && <span style={{ marginLeft: 8 }}>{edu.major}</span>}
                    {edu.academic_degree && (
                      <span className="sub-info" style={{ marginLeft: 4 }}>
                        ({edu.academic_degree})
                      </span>
                    )}
                  </span>
                  <span className="sub-info" style={{ float: 'right' }}>
                    {formatRange(edu.edu_time)}
                  </span>
                </div>
              </div>
            ))}
          </RibbonCard>
        ) : null}

        {value.workList?.length ? (
          <RibbonCard
            title={titles.workList!}
            color={theme.color}
            className="section-work"
          >
            {value.workList.map((work, idx) => (
              <div key={idx}>
                <div>
                  <Crown
                    className="mr-2 inline size-3.5 text-amber-400"
                    style={{ color: '#ffc107', marginRight: 8 }}
                  />
                  <b className="info-name">{work.work_name}</b>
                  {work.visit_link && (
                    <a className="sub-info" href={work.visit_link}>
                      访问链接
                    </a>
                  )}
                </div>
                {work.work_desc && <div>{work.work_desc}</div>}
              </div>
            ))}
          </RibbonCard>
        ) : null}

        {aboutme.some(line => line.trim()) ? (
          <RibbonCard title={titles.aboutme!} color={theme.color} className="section-aboutme">
            {aboutme.map((line, idx) => (
              <div key={idx}>{line}</div>
            ))}
          </RibbonCard>
        ) : null}

        {value.skillList?.length ? (
          <RibbonCard
            title={titles.skillList!}
            color={theme.color}
            className="section-skill"
          >
            {value.skillList.map((skill, idx) => {
              const desc = (skill.skill_desc ?? '')
                .split('\n')
                .filter(Boolean)
                .join('；');
              const text = desc || skill.skill_name;
              if (!text) return null;
              return (
                <div className="skill-item" key={idx}>
                  <span>
                    <CheckCircle2
                      className="inline size-3.5"
                      style={{ color: '#ffc107', marginRight: 8 }}
                    />
                    {text}
                  </span>
                  {skill.skill_level != null && (
                    <Stars level={skill.skill_level} color={theme.color} />
                  )}
                </div>
              );
            })}
          </RibbonCard>
        ) : null}

        {value.awardList?.length ? (
          <RibbonCard
            title={titles.awardList!}
            color={theme.color}
            className="section-award"
          >
            {value.awardList.map((award, idx) => (
              <div key={idx}>
                <Trophy
                  className="inline size-3.5"
                  style={{ color: '#ffc107', marginRight: 8 }}
                />
                <b className="info-name">{award.award_info}</b>
                {award.award_time && (
                  <span className="sub-info award-time">({award.award_time})</span>
                )}
              </div>
            ))}
          </RibbonCard>
        ) : null}
      </div>

      <div className="main-info">
        {value.workExpList?.length ? (
          <section>
            <div className="section-header">
              <h1 style={{ background: theme.color }}>{titles.workExpList}</h1>
            </div>
            <div className="section section-work-exp">
              {value.workExpList.map((work, idx) => (
                <div className="section-item" key={idx}>
                  <div className="section-info">
                    <b className="info-name">
                      {work.company_name}
                      {work.department_name && (
                        <span className="sub-info">{work.department_name}</span>
                      )}
                    </b>
                    <span className="info-time">{formatRange(work.work_time)}</span>
                  </div>
                  <div className="work-description">{work.work_desc}</div>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {value.projectList?.length ? (
          <section>
            <div className="section-header">
              <h1 style={{ background: theme.color }}>{titles.projectList}</h1>
            </div>
            <div className="section section-project">
              {value.projectList.map((project, idx) => (
                <div className="section-item" key={idx}>
                  <div className="section-info">
                    <b className="info-name">
                      {project.project_name}
                      {project.project_time && (
                        <span className="info-time">{project.project_time}</span>
                      )}
                    </b>
                    {project.project_role && (
                      <span
                        className="role-tag"
                        style={{ background: theme.tagColor }}
                      >
                        {project.project_role}
                      </span>
                    )}
                  </div>
                  {project.project_desc && (
                    <div className="section-detail">
                      <b>项目描述：</b>
                      <span>{project.project_desc}</span>
                    </div>
                  )}
                  {project.project_content && (
                    <div className="section-detail">
                      <b>主要工作：</b>
                      <span className="project-content">{project.project_content}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
