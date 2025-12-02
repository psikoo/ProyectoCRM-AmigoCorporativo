package twilight.sparkle.crm.modules.activities;

import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

import java.util.List;

@Slf4j
@Service
public class ActivityService {
  private final ActivityRepository activityRepository;

  public ActivityService(ActivityRepository activityRepository) {
    this.activityRepository = activityRepository;
  }

  public List<Activity> findAll() {
    return activityRepository.findAll();
  }

  public Activity save(Activity activity) {
    return activityRepository.save(activity);
  }

  public void delete(Long id) {
    activityRepository.deleteById(id);
  }

  public Activity findById(Long id) {
    return activityRepository.findById(id).orElse(null);
  }
}
