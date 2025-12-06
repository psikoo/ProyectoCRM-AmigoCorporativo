package twilight.sparkle.crm.modules.companies;

import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

import java.util.List;

@Slf4j
@Service
public class CompanyService {
  private final CompanyRepository companyRepository;

  public CompanyService(CompanyRepository companyRepository) {
    this.companyRepository = companyRepository;
  }

  public List<Company> findAll() {
    return companyRepository.findAll();
  }

  public Company save(Company company) {
    return companyRepository.save(company);
  }
  
  public void delete(Long id) {
    companyRepository.deleteById(id);
  }

  public Company findById(Long id) {
    return companyRepository.findById(id).orElse(null);
  }
  public Company findFirstByName(String name) {
    return companyRepository.findFirstByName(name).orElse(null);
  }
}
