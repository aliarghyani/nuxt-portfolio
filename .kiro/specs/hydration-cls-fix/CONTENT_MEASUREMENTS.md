# Content Section Measurements

Measured on: 2025-11-05

## Section Heights and Spacing

| Section | Height | Padding Top | Padding Bottom |
|---------|--------|-------------|----------------|
| Skills | 673px | 24px | 24px |
| AI Stack | 412px | 24px | 24px |
| Values & Soft Skills | 224px | 24px | 24px |
| Language Proficiency | 399px | 24px | 24px |
| Work Experience | 2248px | 24px | 24px |
| Education | 197px | 24px | 24px |
| Recommendations | 128px | 32px | 32px |

## Skeleton Min-Height Targets

To prevent CLS, skeletons should have these minimum heights:

- **SkillsSkeleton**: `min-h-[673px]` or `min-h-[42rem]`
- **AIStackSkeleton**: `min-h-[412px]` or `min-h-[26rem]`
- **SoftSkillsSkeleton**: `min-h-[224px]` or `min-h-[14rem]`
- **LanguageSkillsSkeleton**: `min-h-[399px]` or `min-h-[25rem]`
- **WorkExperienceSkeleton**: `min-h-[2248px]` or `min-h-[140rem]`
- **EducationListSkeleton**: `min-h-[197px]` or `min-h-[12rem]`
- **RecommendationsCarouselSkeleton**: `min-h-[128px]` or `min-h-[8rem]`

## Notes

- All sections use `py-6` (24px top/bottom) except Recommendations which uses `py-8` (32px)
- Heights are approximate and may vary based on content and viewport width
- Using rem values provides better responsiveness
- Skeletons should match the padding classes of actual content
