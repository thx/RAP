import com.taobao.rigel.rap.common.Patterns;
import com.taobao.rigel.rap.common.StringUtils;

/**
 * Created by Bosn on 2014/8/16.
 */
public class Tester {
    public static void main(String[] args) {
        String str = "霍雍 Bosn";
        boolean result = StringUtils.validateName(str);
        System.out.println(str + " test result: " + result);
    }
}
