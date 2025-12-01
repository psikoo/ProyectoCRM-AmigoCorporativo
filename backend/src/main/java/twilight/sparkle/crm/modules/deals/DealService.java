package twilight.sparkle.crm.modules.deals;

import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

import java.util.List;

@Slf4j
@Service
public class DealService {
  private final DealRepository dealRepository;

  public DealService(DealRepository dealRepository) {
    this.dealRepository = dealRepository;
  }

  public List<Deal> findAll() {
    return dealRepository.findAll();
  }

  public Deal save(Deal deal) {
    return dealRepository.save(deal);
  }

  // public Deal findByName(Integer id) {
  //   return dealRepository.findById(id).orElse(null);
  // }
}
